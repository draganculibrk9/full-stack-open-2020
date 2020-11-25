import React, {useEffect, useState} from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import {useApolloClient} from "@apollo/client";
import Recommendations from "./components/Recommendations";

const App = () => {
    const [page, setPage] = useState('authors')
    const [user, setUser] = useState(null)
    const client = useApolloClient()

    useEffect(() => {
        setUser(localStorage.getItem('library-token'))
    }, [])

    const logout = () => {
        setUser(null)
        localStorage.clear()
        client.resetStore()
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {!user && <button onClick={() => setPage('login')}>login</button>}
                {user && <button onClick={() => setPage('add')}>add book</button>}
                {user && <button onClick={() => setPage('recommendations')}>recommend</button>}
                {user && <button onClick={logout}>logout</button>}
            </div>

            <Authors
                show={page === 'authors'}
            />

            <Books
                show={page === 'books'}
            />

            <NewBook
                show={page === 'add'}
            />

            <Login
                show={page === 'login'}
                setToken={setUser}
                setPage={setPage}
            />

            <Recommendations
                show={page === 'recommendations'}
                token={user}
            />

        </div>
    )
}

export default App