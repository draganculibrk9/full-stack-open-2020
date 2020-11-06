import React, {useState, useEffect} from 'react'
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem('user')))
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

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

    const createBlog = async (event) => {
        event.preventDefault()

        try {
            await blogService.create({
                title,
                author,
                url
            }, user.token)

            setMessage(`a new blog ${title} by ${author} added`)
            setTimeout(() => setMessage(null), 3000)
            setTitle('')
            setAuthor('')
            setUrl('')
            setBlogs(await blogService.getAll())
        } catch (exception) {
            setMessage(exception.response.data.error)
            setTimeout(() => setMessage(null), 3000)
        }
    }

    const blogsForm = () => (
        <form onSubmit={createBlog}>
            <h2>create new</h2>
            <div>
                title <input type='text' value={title} name='Title'
                             onChange={({target}) => setTitle(target.value)}/>
            </div>
            <div>
                author <input type='text' value={author} name='Author'
                              onChange={({target}) => setAuthor(target.value)}/>
            </div>
            <div>
                url <input type='text' value={url} name='Url'
                           onChange={({target}) => setUrl(target.value)}/>
            </div>
            <button type='submit'>create</button>
        </form>
    )

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
                {blogsForm()}
                <br/>
                <Blogs blogs={blogs}/>
            </>
    )
}

export default App