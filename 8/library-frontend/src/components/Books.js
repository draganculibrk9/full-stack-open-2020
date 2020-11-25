import React, {useState} from 'react'
import {useQuery} from "@apollo/client";
import {ALL_BOOKS} from "../queries";

const Books = (props) => {
    const result = useQuery(ALL_BOOKS)
    const [genre, setGenre] = useState('')
    const genres = ['refactoring', 'agile', 'patterns', 'design', 'crime', 'classic', '']

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    const books = result.data.allBooks

    return (
        <div>
            <h2>books</h2>
            {genre && <p>in genre <b>{genre}</b></p>}
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
                {books.filter(b => !genre || b.genres.includes(genre)).map(a =>
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <span>
                {genres.map(g => <button key={g} type='button' onClick={() => setGenre(g)}>{g ? g : 'all genres'}</button>)}
      </span>
        </div>
    )
}

export default Books