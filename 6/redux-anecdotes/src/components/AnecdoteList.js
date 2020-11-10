import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {voteForAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from "../reducers/notificationReducer";
import Filter from './Filter'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter)).sort((a, b) => b.votes - a.votes))
    const dispatch = useDispatch()

    const vote = (id, content) => {
        dispatch(voteForAnecdote(id))
        dispatch(setNotification(`you voted '${content}'`))
        setTimeout(() => dispatch(setNotification(null)), 5000)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter/>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList