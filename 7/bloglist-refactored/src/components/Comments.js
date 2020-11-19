import React from 'react'
import { ListGroup } from 'react-bootstrap'

const Comments = ({ comments }) => (
    <ListGroup>
        {comments.map(comment => <ListGroup.Item key={comment.id}>{comment.text}</ListGroup.Item>)}
    </ListGroup>
)

export default Comments