import React, {useEffect, useState} from 'react'
import {useLazyQuery} from "@apollo/client";
import {ALL_BOOKS} from "../queries";
import jwt_decode from 'jwt-decode'

const Recommendations = ({show, token}) => {
    const [favouriteGenre, setFavouriteGenre] = useState('')
    const [loadBooksByGenre, {called, loading, data}] = useLazyQuery(ALL_BOOKS,
        {
            fetchPolicy: 'network-only',
            variables: {genre: favouriteGenre}
        }
    )

    useEffect(() => {
        if (token) {
            setFavouriteGenre(jwt_decode(token).favouriteGenre)
            loadBooksByGenre()
        }
    }, [token]) // eslint-disable-line

    if (!show) {
        return null
    }

    if (called && loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <p>books in your favourite genre <b>{favouriteGenre}</b></p>
            <table>
                <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>
                        author
                    </th>
                    <th>
                        published
                    </th>
                </tr>
                </thead>
                <tbody>
                {data.allBooks.map(a =>
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendations