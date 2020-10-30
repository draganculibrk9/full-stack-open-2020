const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const blogsRouter = require('./controllers/blogs')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use('/api/blogs', blogsRouter)

module.exports = app
