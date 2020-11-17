import userService from '../services/users'

export const setUser = (user) => {
    return async dispatch => {
        dispatch({
            type: 'SET_USER',
            user
        })
    }
}

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'INITIALIZE_USERS',
            data: users
        })
    }
}

const reducer = (state = { user: null, users: [] }, action) => {
    switch (action.type) {
    case 'SET_USER':
        return {
            ...state,
            user: action.user
        }
    case 'INITIALIZE_USERS':
        return {
            ...state,
            users: action.data
        }
    default:
        return state
    }
}

export default reducer