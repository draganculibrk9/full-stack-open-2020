import blogService from '../services/blogs'

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = (blog, token) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog, token)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const editBlog = (blog, token) => {
    return async dispatch => {
        const editedBlog = await blogService.edit(blog, token)
        dispatch({
            type: 'EDIT_BLOG',
            data: editedBlog
        })
    }
}

export const removeBlog = (id, token) => {
    return async dispatch => {
        await blogService.remove(id, token)
        dispatch({
            type: 'DELETE_BLOG',
            data: id
        })
    }
}


const reducer = (state = [], action) => {
    switch (action.type) {
    case 'NEW_BLOG':
        return state.concat(action.data)
    case 'INIT_BLOGS':
        return action.data
    case 'EDIT_BLOG':
        return state.filter(blog => blog.id === action.data.id ? action.data : blog)
    case 'DELETE_BLOG':
        return state.filter(blog => blog.id !== action.data)
    default:
        return state
    }
}

export default reducer