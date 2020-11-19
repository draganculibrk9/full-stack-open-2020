import userService from '../services/users'

export const setUserDetails = (id) => {
    return async dispatch => {
        const user = await userService.get(id)
        dispatch({
            type: 'SET_USER_DETAILS',
            data: user
        })
    }
}

const reducer = (state = null, action) => {
    switch (action.type) {
    case 'SET_USER_DETAILS':
        return action.data
    default:
        return state
    }
}

export default reducer