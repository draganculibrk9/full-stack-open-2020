import React, {useEffect, useState} from 'react'
import {useLazyQuery} from "@apollo/client";
import {ALL_BOOKS} from "../queries";
import jwt_decode from 'jwt-decode'

const Recommendations = ({show, token}) => {
    const [loadBooksByGenre, result] = useLazyQuery(ALL_BOOKS,
        {fetchPolicy: 'no-cache'})
    const [favouriteGenre, setFavouriteGenre] = useState('')

    useEffect(() => {
        if (show) {
            setFavouriteGenre(jwt_decode(token).favouriteGenre)
            loadBooksByGenre({variables: {genre: favouriteGenre}})
        }
    }, []) //eslint-disable-line

    if (!show) {
        return null
    }

    if (result.called && result.loading) {
        return <div>loading...</div>
    }

    console.log(result)

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
                {result.data.allBooks.map(a =>
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