import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import personsService from './services/persons'
import './App.css'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filtName, setFiltName ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ error, setError ] = useState(null)

  const onClick = (event) => {
    event.preventDefault()
    const names = persons.map(item => item.name)
    if(names.includes(newName)) {
      const person = persons.find(person => person.name === newName)
      if (person.number !== newNumber) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const updatedPerson = {...person, number: newNumber}
          personsService
            .update(person.id, updatedPerson)
              .then(personsData => {
                setPersons(persons.map(p => p.id !== person.id ? p : personsData))
              })
            setNewName('')
            setNewNumber('')

            return
        }
      } else {
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
        return
      }
    }
    const newPerson = {name: newName, number: newNumber}
    personsService
      .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response.data)
          setMessage(error.response.data)
        })
  }

  const onChange = (event) => {
    setNewName(event.target.value)
  }

  const onChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const onChangeFilt = (event) => {
    setFiltName(event.target.value)
  }

  const numbers = () => {
    let names = persons
    if(!(filtName === '')) {
      names = persons.filter(person => person.name.toLowerCase().includes(filtName.toLowerCase()))
    } 
    return (
      names.map((person, i) => {
        return (
          <div key={i}>
          {person.name} {person.number} {" "}
          <button onClick={() => deleteHandler(person.id)}>delete</button> <br/>
          </div>
        ) 
      }
      )
    )
  }

  const deleteHandler = (id) => {
    const name = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${name}?`)){
      personsService
        .del(id)
        setTimeout(() => {
          personsService
            .getAll()
              .then(personsData => setPersons(personsData))
        }, 500)
    }
  }

 useEffect(() => { 
    personsService
      .getAll()
        .then(personsData => {
          setMessage('promise fulfilled')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(personsData)
        })
        .catch(error => {
          setError('promise rejected')
          setTimeout(() => {
            setError(null)
          }, 5000)
        })
  }, [])



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <ErrorMessage error={error}/>
      <Filter filtname={filtName} onChangeFilt={onChangeFilt}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} onChange={onChange} newNumber={newNumber} onChangeNumber={onChangeNumber}
      onClick={onClick}/>
      <h2>Numbers</h2>
      <Persons numbers={numbers()}/>
    </div>
  )
}

export default App