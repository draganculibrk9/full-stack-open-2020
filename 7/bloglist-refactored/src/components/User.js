import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ id, name, blogs }) => (
    <tr>
        <td><Link to={`/users/${id}`}>{name}</Link></td>
        <td>{blogs}</td>
    </tr>
)

export default User