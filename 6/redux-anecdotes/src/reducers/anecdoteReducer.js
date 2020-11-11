import anecdoteService from '../services/anecdotes'

export const voteForAnecdote = (anecdote) => {
    return async dispatch => {
        const changedAnecdote = await anecdoteService.edit(anecdote)
        dispatch({
            type: 'VOTE',
            data: changedAnecdote
        })
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}

export const createAnecdote = (anecdote) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.create(anecdote)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newAnecdote
        })
    }
}


const reducer = (state = [], action) => {
    switch (action.type) {
        case 'VOTE':
            return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data)
        case 'NEW_ANECDOTE':
            return state.concat(action.data)
        case 'INIT_ANECDOTES':
            return action.data
        default:
            return state
    }
}

export default reducer