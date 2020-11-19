import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { Nav, Navbar, Button } from 'react-bootstrap'

const Menu = ({ user }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleLogout = () => {
        window.localStorage.clear()
        dispatch(setUser(null))
        history.push('/')
    }

    return (
        <Navbar collapseOnSelect expand='lg'>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href='#' as='span'>
                        <Link to='/'>blogs</Link>
                    </Nav.Link>
                    <Nav.Link href='#' as='span'>
                        <Link to='/users'>users</Link>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <em>{user.name} logged in <Button onClick={handleLogout}>logout</Button></em>
        </Navbar>
    )
}

export default Menu