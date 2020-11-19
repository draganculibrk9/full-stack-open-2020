import blogService from '../services/blogs'

export const setBlog = (id) => {
    return async dispatch => {
        const blog = await blogService.get(id)
        dispatch({
            type: 'SET_BLOG',
            data: blog
        })
    }
}

export const postComment = (id, comment) => {
    return async dispatch => {
        const blog = await blogService.postComment(id, comment)
        dispatch({
            type: 'POST_COMMENT',
            data: blog
        })
    }
}

const reducer = (state = null, action) => {
    switch (action.type) {
    case 'SET_BLOG':
        return action.data
    case 'POST_COMMENT':
        return action.data
    default:
        return state
    }
}

export default reducer