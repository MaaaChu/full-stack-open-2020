import React from 'react'
import Person from './Person'

const Persons = ({ persons, handleDeletePerson }) => {
    return (
      <div>
      {
        persons.map((person) => {
          return <Person key={person.name} person={person} handleDeletePerson={handleDeletePerson} />
        })
      }      
      </div>
    )
  }

  export default Persons