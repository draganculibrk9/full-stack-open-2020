import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Comments from './Comments'
import { postComment, setBlog } from '../reducers/blogDetailsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { editBlog } from '../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'

const BlogDetails = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.user)
    const blog = useSelector(state => state.blogDetails)
    const [comment, setComment] = useState('')

    if(!blog) {
        return null
    }

    const like = () => {
        const likedBlog = {
            ...blog,
            likes: ++blog.likes,
            user: blog.user.id,
            comments: blog.comments.map(c => c.id)
        }
        try {
            dispatch(editBlog(likedBlog, user.token))
            dispatch(setBlog(blog.id))
            dispatch(setNotification(`liked blog ${likedBlog.title} by ${likedBlog.author}`, 3000))
        } catch (exception) {
            dispatch(setNotification(exception.response.data.error, 3000))
        }
    }

    const writeComment = (event) => {
        event.preventDefault()
        dispatch(postComment(blog.id, { text: comment }))
    }

    if (!blog) {
        return null
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <a href={blog.info}>{blog.info}</a>
            <div>
                <p>{blog.likes} likes</p>
                <Button variant='secondary' onClick={like}>like</Button>
            </div>
            <p>added by {blog.author}</p>
            <h3>comments</h3>
            <Form onSubmit={writeComment}>
                <Form.Group>
                    <Form.Control type='text' value={comment} name='comment' onChange={({ target }) => setComment(target.value)}/>
                    <Button variant='primary' type='submit'>add comment</Button>
                </Form.Group>
            </Form>
            <Comments comments={blog.comments}/>
        </div>
    )
}

export default BlogDetails