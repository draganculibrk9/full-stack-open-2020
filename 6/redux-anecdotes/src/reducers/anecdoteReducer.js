export const voteForAnecdote = (id) => {
    return {
        type: 'VOTE',
        data: {id}
    }
}

export const newAnecdote = (anecdote) => {
    return {
        type: 'NEW_ANECDOTE',
        data: anecdote
    }
}

export const initAnecdotes = (anecdotes) => {
    return {
        type: 'INIT_ANECDOTES',
        data: anecdotes
    }
}

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'VOTE':
            const id = action.data.id
            const votedAnecdote = state.find(a => a.id === id)
            const newAnecdote = {
                ...votedAnecdote,
                votes: votedAnecdote.votes + 1
            }
            return state.map(anecdote => anecdote.id !== id ? anecdote : newAnecdote)
        case 'NEW_ANECDOTE':
            return state.concat(action.data)
        case 'INIT_ANECDOTES':
            return action.data
        default:
            return state
    }
}

export default reducer