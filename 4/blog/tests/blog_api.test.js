const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]

const newBlog = {
    title: "New blog",
    author: "Author",
    url: "http://blog.newblog",
    likes: 0
}

const newBlogWithoutLikes = {
    title: "New blog",
    author: "Author",
    url: "http://blog.newblog"
}

const newBlogWithoutTitle = {
    author: "Author",
    url: "http://blog.newblog",
    likes: 0
}

const newBlogWithoutUrl = {
    title: "New blog",
    author: "Author",
    likes: 0
}

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

})

test('blogs are returned as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('blogs have id', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
    response.body.forEach((blog) => expect(blog.id).toBeDefined()
    )
})

test('new blog is created', async () => {
    let response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const createdBlog = response.body

    expect(createdBlog.title).toBe(newBlog.title)
    expect(createdBlog.author).toBe(newBlog.author)
    expect(createdBlog.url).toBe(newBlog.url)
    expect(createdBlog.likes).toBe(newBlog.likes)
    expect(createdBlog.id).toBeDefined()

    response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body.length).toEqual(initialBlogs.length + 1)

})

test('default value of likes property is set to zero', async () => {
    const response = await api
        .post('/api/blogs')
        .send(newBlogWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const createdBlog = response.body

    expect(createdBlog.likes).toBe(newBlog.likes)
    expect(createdBlog.id).toBeDefined()
})

test('missing title returns bad request', async () => {
    await api
        .post('/api/blogs')
        .send(newBlogWithoutTitle)
        .expect(400)
})

test('missing url returns bad request', async () => {
    await api
        .post('/api/blogs')
        .send(newBlogWithoutUrl)
        .expect(400)
})

afterAll(() => mongoose.connection.close())