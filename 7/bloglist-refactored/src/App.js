import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog as create } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import { setUserDetails } from './reducers/userDetailsReducer'
import Menu from './components/Menu'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'
import { setBlog } from './reducers/blogDetailsReducer'
import { Button, Form } from 'react-bootstrap'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector(state => state.users.user)

    const blogFormRef = useRef()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUser(JSON.parse(window.localStorage.getItem('user'))))
    }, [dispatch])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })

            dispatch(setUser(user))
            setUsername('')
            setPassword('')

            window.localStorage.setItem('user', JSON.stringify(user))
            dispatch(initializeBlogs())
        } catch (exception) {
            dispatch(setNotification(exception.response.data.error, 3000))
        }
    }

    const loginForm = () => (
        <Form onSubmit={handleLogin} id='loginForm'>
            <Form.Group>
                <Form.Label>
                    username
                </Form.Label>
                <Form.Control type='text' value={username} name='Username' id='username'
                    onChange={({ target }) => setUsername(target.value)}/>
                <Form.Label>
                    password
                </Form.Label>
                <Form.Control type='password' value={password} name='Password' id='password'
                    onChange={({ target }) => setPassword(target.value)}/>
                <Button type='submit' id='loginButton'>Login</Button>
            </Form.Group>
        </Form>
    )

    const createBlog = async (blog) => {
        blogFormRef.current.toggleVisibility()
        try {
            dispatch(create(blog, user.token))
            dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`, 3000))
        } catch (exception) {
            dispatch(setNotification(exception.response.data.error, 3000))
        }
    }

    const blogMatch = useRouteMatch('/blogs/:id')
    blogMatch && dispatch(setBlog(blogMatch.params.id))

    const userMatch = useRouteMatch('/users/:id')
    userMatch && dispatch(setUserDetails(userMatch.params.id))

    return (
        user === null
            ? <div className='container'>
                <h2>log in to application</h2>
                <br/>
                <Notification/>
                <br/>
                {loginForm()}
            </div>
            : <div className='container'>
                <Menu user={user}/>
                <h2>Blog app</h2>
                <Notification/>
                <Switch>
                    <Route path='/users/:id'>
                        <UserDetails/>
                    </Route>
                    <Route path='/users'>
                        <Users/>
                    </Route>
                    <Route path='/blogs/:id'>
                        <BlogDetails/>
                    </Route>
                    <Route path='/'>
                        <div>
                            <Togglable buttonLabel='new blog' ref={blogFormRef}>
                                <BlogForm createHandle={createBlog}/>
                            </Togglable>
                            <br/>
                            <Blogs/>
                        </div>
                    </Route>
                </Switch>
            </div>
    )
}

export default App