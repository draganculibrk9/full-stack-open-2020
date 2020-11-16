import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const Blogs = ({ editHandle, removeHandle }) => {
    const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))

    return (
        <div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} editHandle={editHandle} removeHandle={removeHandle}/>
            )}
        </div>
    )
}

export default Blogs