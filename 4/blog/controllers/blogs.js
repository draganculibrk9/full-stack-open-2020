const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', {username: 1, name: 1, _id: 1})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
        .populate('user', {username: 1, name: 1, _id: 1})
        .populate('comments', {_id: 1, text: 1})
        .exec()

    response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const creator = await User.findById(decodedToken.id)

    const blog = new Blog({
        ...request.body,
        user: creator._id
    })

    const savedBlog = await blog.save()
    creator.blogs = creator.blogs.concat(savedBlog)
    await creator.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (user._id.toString() !== blog.user.toString()) {
        return response.sendStatus(401)
    }
    user.blogs = user.blogs.filter(b => b._id.toString() !== blog._id.toString())
    await user.save()
    await blog.delete()
    response.sendStatus(204)
})

blogsRouter.put('/:id', async (request, response) => {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
    response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const comment = new Comment({...request.body})
    const savedComment = await comment.save()

    const blog = await Blog.findById(request.params.id)
        .populate('comments')
    blog.comments = blog.comments.concat(savedComment)
    const savedBlog = await blog.save()

    response.json(savedBlog)
})

module.exports = blogsRouter