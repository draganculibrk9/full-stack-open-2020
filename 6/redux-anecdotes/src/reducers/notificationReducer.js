export const setNotification = (notification) => {
    return {
        type: 'SET_NOTIFICATION',
        notification
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