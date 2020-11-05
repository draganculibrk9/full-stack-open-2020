const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.password || body.password.length < 3) {
        return response.status(400).json({error: 'password must be at least 3 characters long'})
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        hashedPassword
    })

    const savedUser = await user.save()

    response.status(201)
        .json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
        .populate('blogs', {url: 1, title: 1, author: 1, _id: 1})
    response.json(users)
})

module.exports = usersRouter