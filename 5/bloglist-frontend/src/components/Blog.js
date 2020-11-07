import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, editHandle, removeHandle }) => {
    const [additionalInfo, setAdditionalInfo] = useState(false)

    const toggleAdditionalInfo = () => setAdditionalInfo(!additionalInfo)

    const like = () => {
        const likedBlog = {
            ...blog,
            likes: ++blog.likes,
            user: blog.user.id
        }

        editHandle(likedBlog)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const remove = () => {
        window.confirm(`Remove blog ${blog.name} by ${blog.author}`) && removeHandle(blog)
    }

    const displayWhenAdditionalInfo = { display: additionalInfo ? '' : 'none' }

    return (
        <div style={blogStyle}>
            <div className='basicInfo'>{blog.title} {blog.author} &nbsp;
                <button onClick={toggleAdditionalInfo}>{additionalInfo ? 'hide' : 'view'}</button>
            </div>
            <div className='additionalInfo' style={displayWhenAdditionalInfo}>
                <div>{blog.url} likes {blog.likes} &nbsp;
                    <button onClick={like}>like</button>
                </div>
                <div>{blog.user.name}</div>
                <div>
                    <button onClick={remove}>remove</button>
                </div>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    editHandle: PropTypes.func.isRequired,
    removeHandle: PropTypes.func.isRequired
}

export default Blog
