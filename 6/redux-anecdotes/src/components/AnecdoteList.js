import React from 'react'
import {connect} from 'react-redux'
import {voteForAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from "../reducers/notificationReducer";
import Filter from './Filter'

const AnecdoteList = (props) => {
    const vote = (anecdote) => {
        props.voteForAnecdote({...anecdote, votes: anecdote.votes + 1})
        props.setNotification(`you voted '${anecdote.content}'`, 5000)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter/>
            {props.anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter)).sort((a, b) => b.votes - a.votes)
    }
}

export default connect(
    mapStateToProps,
    {
        voteForAnecdote,
        setNotification
    }
)(AnecdoteList)