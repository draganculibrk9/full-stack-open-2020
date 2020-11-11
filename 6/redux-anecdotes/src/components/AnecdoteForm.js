import React from 'react'
import {useDispatch} from 'react-redux'
import {newAnecdote} from "../reducers/anecdoteReducer";
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()

        const content = event.target.Content.value
        event.target.Content.value = ''

        const anecdote = await anecdoteService.create({content, votes: 0})

        dispatch(newAnecdote(anecdote))
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