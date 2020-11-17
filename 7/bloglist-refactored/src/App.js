import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, removeBlog as remove, createBlog as create, editBlog as edit } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import Menu from './components/Menu'
import { Switch, Route } from 'react-router-dom'
import Users from './components/Users'
import UserDetails from "./components/UserDetails";

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

    const handleLogout = () => {
        window.localStorage.clear()
        dispatch(setUser(null))
    }

    const loginForm = () => (
        <form onSubmit={handleLogin} id='loginForm'>
            <div>
                username <input type='text' value={username} name='Username' id='username'
                    onChange={({ target }) => setUsername(target.value)}/>
            </div>
            <div>
                password <input type='password' value={password} name='Password' id='password'
                    onChange={({ target }) => setPassword(target.value)}/>
            </div>
            <button type='submit' id='loginButton'>Login</button>
        </form>
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

    const editBlog = async (blog) => {
        try {
            dispatch(edit(blog, user.token))
            dispatch(setNotification(`liked blog ${blog.title} by ${blog.author}`, 3000))
        } catch (exception) {
            dispatch(setNotification(exception.response.data.error, 3000))
        }
    }

    const removeBlog = async (blog) => {
        try {
            dispatch(remove(blog.id, user.token))
            dispatch(setNotification(`removed blog ${blog.title} by ${blog.author}`, 3000))
        } catch (exception) {
            dispatch(setNotification(exception.response.data.error, 3000))
        }
    }

    return (
        user === null
            ? <>
                <h2>log in to application</h2>
                <br/>
                <Notification/>
                <br/>
                {loginForm()}
            </>
            : <>
                <h2>Blogs</h2>
                <br/>
                <Notification/>
                <br/>
                <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
                <Menu/>
                <Switch>
                    <Route path='/users/:id'>
                        <UserDetails/>
                    </Route>
                    <Route path='/users'>
                        <Users/>
                    </Route>
                    <Route path='/'>
                        <div>
                            <Togglable buttonLabel='new blog' ref={blogFormRef}>
                                <BlogForm createHandle={createBlog}/>
                            </Togglable>
                            <br/>
                            <Blogs editHandle={editBlog} removeHandle={removeBlog}/>
                        </div>
                    </Route>
                </Switch>
            </>
    )
}

export default App