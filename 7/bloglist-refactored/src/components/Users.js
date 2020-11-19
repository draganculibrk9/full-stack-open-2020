import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import User from './User'
import Table from 'react-bootstrap/Table'

const Users = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    const users = useSelector(state => state.users.users.sort((a, b) => b.blogs.length - a.blogs.length))

    return (
        <Table striped>
            <thead>
                <tr>
                    <td>&nbsp;</td>
                    <td><b>blogs created</b></td>
                </tr>
            </thead>
            <tbody>
                {users.map(user => <User key={user.id} id={user.id} name={user.name} blogs={user.blogs.length}/>)}
            </tbody>
        </Table>
    )
}

export default Users