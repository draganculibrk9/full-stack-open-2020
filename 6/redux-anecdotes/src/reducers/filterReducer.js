export const setFilter = (text) => {
    return {
        type: 'SET_FILTER',
        text
    }
}

const reducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.text
        default:
            return state
    }
}

export default reducer