const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const reducer = (accummulator, currentValue) => accummulator + currentValue.likes

const totalLikes = (blogs) => {
    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.length ? blogs.sort((a, b) => b.likes - a.likes)[0] : {}
}

const mostBlogs = (blogs) => {
    return lodash(blogs).countBy('author')
        .map((count, author) => {
            return {
                'author': author,
                'blogs': count
            }
        })
        .orderBy('blogs', 'desc')
        .head()
}

const mostLikes = (blogs) => {
    return lodash(blogs).groupBy('author')
        .map((list, author) => {
            return {
                'author': author,
                'likes': lodash(list).reduce((sum, blog) => sum + blog.likes, 0)
            }
        })
        .orderBy('likes', 'desc')
        .head()
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}