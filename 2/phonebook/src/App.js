import React, {useState, useEffect} from 'react'
import {getAll, create, remove, edit} from './services/phonebook'

const Person = ({name, number}) =>
    (
        <li>{name} {number}</li>
    )

const Persons = ({persons, deleteHandler}) =>
    (
        <ul>
            {persons.map(p => <span><Person key={p.name} name={p.name} number={p.number}/>
                <button
                    onClick={() => deleteHandler(p.id, p.name)}>delete
                </button>
            </span>)}
        </ul>
    )

const Filter = ({value, handler}) =>
    (
        <div>
            filter shown with <input value={value} onChange={handler}/>
        </div>
    )

const PersonForm = ({name, number, nameHandler, numberHandler, submitHandler}) =>
    (
        <form onSubmit={submitHandler}>
            <div>
                name: <input value={name} onChange={nameHandler}/>
            </div>
            <div>
                number: <input value={number} onChange={numberHandler}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )

const App = () => {
    const [persons, setPersons] = useState([])

    const hook = () => {
        getAll().then(persons => setPersons(persons))
    }

    useEffect(hook, [])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const [filter, setFilter] = useState('')

    const personsToShow = filter ? persons.filter(p => p.name.toLowerCase().startsWith(filter)) : persons;

    const addPerson = (event) => {
        event.preventDefault();
        const person = persons.find(person => person.name === newName)

        if (person) {
            const changedPerson = {...person, number: newNumber}
            edit(changedPerson).then(changed => setPersons(persons.filter(p => p.id !== person.id).concat(changed)))
        } else {
            const newPerson = {
                name: newName,
                number: newNumber
            }

            create(newPerson).then(person => setPersons(persons.concat(person)))
        }

        setNewName('')
        setNewNumber('')
    }

    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            remove(id).then(status => {
                if (status === 200) {
                    setPersons(persons.filter(person => person.id !== id))
                } else {
                    console.log('Failed to remove person')
                }
            })
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={filter} handler={(event) => setFilter(event.target.value)}/>
            <h3>add a new</h3>
            <PersonForm name={newName} nameHandler={handleNameChange} number={newNumber}
                        numberHandler={handleNumberChange} submitHandler={addPerson}/>
            <h3>Numbers</h3>
            <Persons persons={personsToShow} deleteHandler={deletePerson}/>
        </div>
    )
}

export default App