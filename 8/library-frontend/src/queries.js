import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }    
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author
            published
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            title
            author
            published
        }
    }
`

export const SET_AUTHOR_BIRTHYEAR = gql`
    mutation setAuthorBirthyear($name: String!, $birthyear: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $birthyear
        ) {
            name
            born
            bookCount
            id
        }
    }
`