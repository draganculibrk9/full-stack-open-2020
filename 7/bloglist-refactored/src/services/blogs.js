import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const get = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const getComments = (id) => {
    const request = axios.get(`${baseUrl}/${id}/comments`)
    return request.then(response => response.data)
}

const postComment = (id, comment) => {
    const request = axios.post(`${baseUrl}/${id}/comments`, comment)
    return request.then(response => response.data)
}

const create = (blog, token) => {
    const request = axios.post(baseUrl, blog, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return request.then(response => response.data)
}

const edit = (blog, token) => {
    const request = axios.put(`${baseUrl}/${blog.id}`, blog, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return request.then(response => response.data)
}

const remove = (id, token) => {
    const request = axios.delete(`${baseUrl}/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return request.then(response => response.data)
}

export default { getAll, create, edit, remove, getComments, postComment, get }