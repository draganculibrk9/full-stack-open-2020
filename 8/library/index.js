require('dotenv').config()
const {ApolloServer, gql, PubSub} = require('apollo-server')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const {UserInputError, AuthenticationError} = require('apollo-server-errors')
const jwt = require('jsonwebtoken')

const pubsub = new PubSub()

const typeDefs = gql`
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
    type Token {
        value: String!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!,
            author: String!,
            published: Int!,
            genres: [String!]!
        ) : Book
        editAuthor(
            name: String!,
            setBornTo: Int!
        ): Author
        createUser(
            username: String!,
            favouriteGenre: String!
        ): User
        login(
            username: String!,
            password: String!
        ): Token
    }

    type Subscription {
        bookAdded: Book!
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.find().count(),
        authorCount: () => Author.find().count(),
        allBooks: async (root, args) => {
            const query = {}
            if (args.author) {
                query.author = args.author
            }
            if (args.genre) {
                query.genres = args.genre
            }

            return Book.find(query).populate('author', {name: 1})
        },
        allAuthors: () => Author.find(),
        me: (root, args, context) => context.currentUser
    },
    Author: {
        bookCount: async (root) => {
            return root.authorOf.length
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new AuthenticationError('Invalid token')
            }

            let author = await Author.findOne({name: args.author})

            if (!author) {
                try {
                    author = new Author({name: args.author})
                    author = await author.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                }
            }

            const book = new Book({...args, author: author._id})

            try {
                let savedBook = await book.save()
                author.authorOf = author.authorOf.concat(savedBook._id)
                await author.save()
                savedBook = savedBook.populate('author').execPopulate()

                pubsub.publish('BOOK_ADDED', {bookAdded: savedBook})

                return savedBook
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
        },
        editAuthor: (root, args, context) => {
            if (!context.currentUser) {
                throw new AuthenticationError('Invalid token')
            }

            try {
                return Author.findOneAndUpdate({name: args.name}, {born: args.setBornTo}, {
                    runValidators: true,
                    new: true
                })
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
        },
        createUser: (root, args) => {
            const user = new User({...args, password: 'password'})
            return user.save()
        },
        login: async (root, args) => {
            const user = await User.findOne({username: args.username})

            if (!user || args.password !== 'password') {
                throw new UserInputError('Wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id,
                favouriteGenre: user.favouriteGenre
            }

            return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return {currentUser}
        }
    }
})

server.listen().then(({url, subscriptionsUrl}) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})