import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import {useDispatch} from "react-redux";
import {initAnecdotes} from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

const App = () => {
    const dispatch = useDispatch()

    useEffect(
        () => {
            anecdoteService.getAll().then(anecdotes => dispatch(initAnecdotes(anecdotes)))
        },
        [dispatch])

    return (
        <div>
            <Notification/>
            <AnecdoteList/>
            <AnecdoteForm/>
        </div>
    )
}

export default App