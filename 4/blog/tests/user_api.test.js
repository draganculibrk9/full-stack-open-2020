const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const userWithoutUsername = {
    password: "test",
    name: "New User"
}

const rootUser = {
    username: "root",
    name: "Root Root",
    password: "Root"
}

const userWithoutPassword = {
    username: "newuser",
    name: "New User"
}

const userWithShortUsername = {
    username: "ne",
    name: "New User",
    password: "newuser97"
}

const userWithShortPassword = {
    username: "new user",
    name: "New User",
    password: "ne"
}

const userWithNonUniqueUsername = {
    username: "root",
    name: "new root",
    password: "new password"
}

beforeEach(async () => {
    await User.deleteMany({})

    const root = new User(rootUser)

    await root.save()
})

describe('testing user creation', () => {
    test('send user without username', async () => {
        const response = await api
            .post('/api/users')
            .send(userWithoutUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain('`username` is required')
    })

    test('send user without password', async () => {
        const response = await api
            .post('/api/users')
            .send(userWithoutPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain('password must be at least 3 characters long')
    })

    test('send user with short username', async () => {
        const response = await api
            .post('/api/users')
            .send(userWithShortUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain('`username` (`ne`) is shorter than the minimum allowed length (3)')
    })

    test('send user with short password', async () => {
        const response = await api
            .post('/api/users')
            .send(userWithShortPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain('password must be at least 3 characters long')
    })

    test('send user with non unique username', async () => {
        const response = await api
            .post('/api/users')
            .send(userWithNonUniqueUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain('expected `username` to be unique')
    })
})

afterAll(() => mongoose.connection.close())