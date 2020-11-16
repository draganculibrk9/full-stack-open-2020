export const setNotification = (notification, duration) => {
    return async dispatch => {
        clearTimeout()

        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })

        setTimeout(() => dispatch({
            type: 'SET_NOTIFICATION',
            notification: null
        }), duration)
    }
}

const reducer = (state = null, action) => {
    switch (action.type) {
    case 'SET_NOTIFICATION':
        return action.notification
    default:
        return state
    }
}

export default reducer