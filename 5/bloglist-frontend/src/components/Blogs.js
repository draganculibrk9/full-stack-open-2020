import React from 'react'
import Blog from "./Blog";

const Blogs = ({blogs, editHandle, removeHandle}) => (
    <div>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} editHandle={editHandle} removeHandle={removeHandle}/>
        )}
    </div>
)

export default Blogs