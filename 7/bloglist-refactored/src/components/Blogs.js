import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const Blogs = () => {
    const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))

    return (
        <div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
            )}
        </div>
    )
}

export default Blogs