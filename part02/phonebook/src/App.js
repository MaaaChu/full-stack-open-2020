import React, { useState, useEffect } from 'react'
import PersonsList from './components/PersonsList'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import numbersService from './services/numbers'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ NotificationMessage, setNotificationMessage ] = useState(null)
  const [ isError, setIsError ] = useState(false)

  useEffect(() => {
    numbersService
      .getAllPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNewPerson = (e) => {
    e.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if(!checkIfDuplicate(personObject)) {
      numbersService  
        .addNewPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(err => console.log(err))
    } else {
      if(window.confirm(`${personObject.name} is already added to phonebook , replace the old number with the new one?`)) {
        updatePerson(personObject)
      } 
    }
  }

  const handleOnChangeName = (e) => {
    setNewName(e.target.value)
  }

  const handleOnChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleOnChangeFilter = (e) => {
    setNewFilter(e.target.value)
  }

  const handleDeletePerson = (person) => {
    if(window.confirm(`Delete ${person.name}?`)) {
      numbersService
        .deletePerson(person.id)
        .then(setPersons(persons.filter(p => p.id !== person.id)))
        .then(() => {
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert(`${person.name} was already deleted from the server`)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const updatePerson = (newPerson) => {
    const existingPerson = persons.find(p => p.name === newPerson.name)

    numbersService
      .updatePerson(existingPerson.id, newPerson)
      .then(updatedPerson => {
        setPersons(persons.map(p => p.name === updatedPerson.name ? updatedPerson : p))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(
          `Updated ${updatedPerson.name}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        setIsError(true)
        setNotificationMessage(
          `Information of ${existingPerson.name} has already been removed from server`
        )
        setPersons(persons.filter(p => p.id !== existingPerson.id))
        setTimeout(() => {
          setNotificationMessage(null)
          setIsError(false)
        }, 5000)
        console.log(error)
      })
  }

  const checkIfDuplicate = (props) => persons.some(person => person.name === props.name)

  const personsToShow = newFilter === '' ?
    persons :
    persons.filter(person => newFilter.toLowerCase().includes(person.name.toLowerCase()))
 
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={NotificationMessage} isError={isError}/>

      <Filter
        newFilter={newFilter}
        handleOnChangeFilter={handleOnChangeFilter}
      />

      <h2>Add a new</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        addNewName={addNewPerson} 
        handleOnChangeName={handleOnChangeName} 
        handleOnChangeNumber={handleOnChangeNumber}
      />

      <h2>Numbers</h2>
      <PersonsList persons={personsToShow} handleDeletePerson={handleDeletePerson} />

    </div>
  )
}

export default App