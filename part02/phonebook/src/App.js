import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const addNewName = (e) => {
    e.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    !checkIfDuplicate(nameObject) ?
      setPersons(persons.concat(nameObject))  :
      alert(`${nameObject.name} is already added to phonebook`)    

      setNewName('') 
      setNewNumber('')
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

  const checkIfDuplicate = (props) => persons.some(person => person.name === props.name)

  const personsToShow = newFilter === '' ?
    persons :
    persons.filter(person => newFilter.toLowerCase().includes(person.name.toLowerCase()))
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newFilter={newFilter}
        handleOnChangeFilter={handleOnChangeFilter}
      />

      <h2>Add a new</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        addNewName={addNewName} 
        handleOnChangeName={handleOnChangeName} 
        handleOnChangeNumber={handleOnChangeNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />

    </div>
  )
}

export default App