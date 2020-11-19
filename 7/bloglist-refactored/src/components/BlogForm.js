import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ createHandle }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()

        createHandle({ title, author, url })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <Form onSubmit={addBlog}>
            <h2>create new</h2>
            <Form.Group>
                <Form.Label>
                    title
                </Form.Label>
                <Form.Control type='text' value={title} name='Title' id='title'
                    onChange={({ target }) => setTitle(target.value)}/>
                <Form.Label>
                    author
                </Form.Label>
                <Form.Control type='text' value={author} name='Author' id='author'
                    onChange={({ target }) => setAuthor(target.value)}/>

                <Form.Label>
                    url
                </Form.Label> <Form.Control type='text' value={url} name='Url' id='url'
                    onChange={({ target }) => setUrl(target.value)}/>
                <Button variant='primary' type='submit' id='createBlog'>create</Button>
            </Form.Group>
        </Form>
    )
}

export default BlogForm