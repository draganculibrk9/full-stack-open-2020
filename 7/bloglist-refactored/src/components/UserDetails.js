import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserDetails = () => {
    const match = useRouteMatch('/users/:id')
    const users = useSelector(state => state.users.users)
    const userById = (id) => users.find(u => u.id === id)
    const user = match ? userById(match.params.id) : null

    if (!user) {
        return null
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
            </ul>
        </div>
    )
}

export default UserDetails