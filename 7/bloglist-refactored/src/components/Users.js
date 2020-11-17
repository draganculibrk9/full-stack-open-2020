import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import User from './User'


const Users = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    const users = useSelector(state => state.users.users.sort((a, b) => b.blogs.length - a.blogs.length))

    return (
        <table>
            <thead>
                <tr>
                    <td>&nbsp;</td>
                    <td><b>blogs created</b></td>
                </tr>
            </thead>
            <tbody>
                {users.map(user => <User key={user.id} id={user.id} name={user.name} blogs={user.blogs.length}/>)}
            </tbody>
        </table>
    )
}

export default Users