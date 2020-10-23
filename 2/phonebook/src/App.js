import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Person = ({name, number}) =>
    (
        <li>{name} {number}</li>
    )

const Persons = ({persons}) =>
    (
        <ul>
            {persons.map(p => <Person key={p.name} name={p.name} number={p.number}/>)}
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
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data);
            })
    }

    useEffect(hook, [])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const [filter, setFilter] = useState('')

    const personsToShow = filter ? persons.filter(p => p.name.toLowerCase().startsWith(filter)) : persons;

    const addPerson = (event) => {
        event.preventDefault();
        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
        } else {
            setPersons(persons.concat({
                name: newName,
                number: newNumber
            }));
            setNewName('');
            setNewNumber('')
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
            <Persons persons={personsToShow}/>
        </div>
    )
}

export default App