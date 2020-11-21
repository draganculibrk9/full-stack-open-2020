import React, {useState} from 'react'
import {useMutation, useQuery} from "@apollo/client";
import {ALL_AUTHORS, SET_AUTHOR_BIRTHYEAR} from "../queries";
import Select from "react-select";

const Authors = (props) => {
    const result = useQuery(ALL_AUTHORS)
    const [name, setName] = useState(null)
    const [birthyear, setBirthyear] = useState('')
    const [setAuthorBirthyear] = useMutation(SET_AUTHOR_BIRTHYEAR)

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    const setAuthorBirthyearHandler = async (event) => {
        event.preventDefault()

        await setAuthorBirthyear({variables: {name: name.value, birthyear: Number(birthyear)}})

        setName('')
        setBirthyear('')
    }

    const authors = result.data.allAuthors

    return (
        <div>
            <h2>authors</h2>
            <table>
                <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>born</th>
                    <th>books</th>
                </tr>
                </thead>
                <tbody>
                {authors.map(a =>
                    <tr key={a.name}>
                        <td>{a.name}</td>
                        <td>{a.born}</td>
                        <td>{a.bookCount}</td>
                    </tr>
                )}
                </tbody>
            </table>

            <h2>Set birthyear</h2>
            <form onSubmit={setAuthorBirthyearHandler}>
                <Select defaultValue={name} onChange={setName} options={authors.map(a => {
                    return {
                        value: a.name,
                        label: a.name
                    }
                })}/>
                <div>born <input type='number' value={birthyear} onChange={({target}) => setBirthyear(target.value)}/>
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default Authors
