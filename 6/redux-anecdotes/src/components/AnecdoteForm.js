import React from 'react'
import {connect} from 'react-redux'
import {createAnecdote as create} from "../reducers/anecdoteReducer";
import {setNotification} from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
    const createAnecdote = async (event) => {
        event.preventDefault()

        const content = event.target.Content.value
        event.target.Content.value = ''

        props.create({content, votes: 0})
        props.setNotification(`new anecdote '${content}'`, 3000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div><input name='Content'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default connect(
    null,
    {
        create,
        setNotification
    }
)(AnecdoteForm)