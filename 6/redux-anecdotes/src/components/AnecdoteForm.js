import React from 'react'
import {useDispatch} from 'react-redux'
import {newAnecdote} from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()

        const content = event.target.Content.value
        event.target.Content.value = ''

        dispatch(newAnecdote(content))
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

export default AnecdoteForm