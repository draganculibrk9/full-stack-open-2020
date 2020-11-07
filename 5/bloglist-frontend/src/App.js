import React, {useState, useEffect, useRef} from 'react'
import Blogs from "./components/Blogs"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem('user')))
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })

            setUser(user)
            setUsername('')
            setPassword('')

            window.localStorage.setItem('user', JSON.stringify(user))
        } catch (exception) {
            setMessage(exception.response.data.error)
            setTimeout(() => setMessage(null), 3000)
        }
    }

    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username <input type='text' value={username} name='Username'
                                onChange={({target}) => setUsername(target.value)}/>
            </div>
            <div>
                password <input type='password' value={password} name='Password'
                                onChange={({target}) => setPassword(target.value)}/>
            </div>
            <button type='submit'>Login</button>
        </form>
    )

    const createBlog = async (blog) => {
        blogFormRef.current.toggleVisibility()
        try {
            await blogService.create(blog, user.token)

            setMessage(`a new blog ${blog.title} by ${blog.author} added`)
            setTimeout(() => setMessage(null), 3000)
            setBlogs(await blogService.getAll())
        } catch (exception) {
            setMessage(exception.response.data.error)
            setTimeout(() => setMessage(null), 3000)
        }
    }

    const editBlog = async (blog) => {
        try {
            await blogService.edit(blog, user.token)

            setMessage(`liked blog ${blog.title} by ${blog.author}`)
            setTimeout(() => setMessage(null), 3000)
            setBlogs(await blogService.getAll())
        } catch (exception) {
            setMessage(exception.response.data.error)
            setTimeout(() => setMessage(null), 3000)
        }
    }

    const removeBlog = async (blog) => {
        try {
            await blogService.remove(blog.id, user.token)

            setMessage(`removed blog ${blog.title} by ${blog.author}`)
            setTimeout(() => setMessage(null), 3000)
            setBlogs(await blogService.getAll())
        } catch (exception) {
            setMessage(exception.response.data.error)
            setTimeout(() => setMessage(null), 3000)
        }
    }

    return (
        user === null
            ? <>
                <h2>log in to application</h2>
                <br/>
                <Notification message={message}/>
                <br/>
                {loginForm()}
            </>
            : <>
                <h2>Blogs</h2>
                <br/>
                <Notification message={message}/>
                <br/>
                <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
                <br/>
                <Togglable buttonLabel='new blog' ref={blogFormRef}>
                    <BlogForm createHandle={createBlog}/>
                </Togglable>
                <br/>
                <Blogs blogs={sortedBlogs} editHandle={editBlog} removeHandle={removeBlog}/>
            </>
    )
}

export default App