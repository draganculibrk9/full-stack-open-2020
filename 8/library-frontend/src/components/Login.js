import React, {useEffect, useState} from 'react'
import {useMutation} from "@apollo/client";
import {LOGIN} from "../queries";

const Login = ({show, setToken, setPage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginMutation, result] = useMutation(LOGIN, {
        onError: (error) => window.alert(error.graphQLErrors[0].message)
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-token', token)
            setPage('books')
        }
    }, [result.data]) // eslint-disable-line

    const login = (event) => {
        event.preventDefault()

        loginMutation({variables: {username, password}})
    }

    if (!show) {
        return null
    }

    return (
        <form onSubmit={login}>
            <div>
                username <input type='text' value={username} onChange={({target}) => setUsername(target.value)}/>
            </div>
            <div>
                password <input type='password' value={password} onChange={({target}) => setPassword(target.value)}/>
            </div>
            <button type='submit'>login</button>
        </form>
    )
}

export default Login