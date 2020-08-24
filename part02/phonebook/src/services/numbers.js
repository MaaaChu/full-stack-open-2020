import axios from 'axios'

const relativeURL = '/api/persons'

const getAllPersons = () => {
    const request = axios.get(relativeURL)
    return request.then(response => response.data)
}

const addNewPerson = (newPerson) => {
    const request = axios.post(relativeURL, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const deleteURL = `${relativeURL}/${id}`
    const request = axios.delete(deleteURL)
    return request.then(response => response.data)
}

const updatePerson = (id, newPerson) => {
    const updatePersonURL = `${relativeURL}/${id}`
    const request = axios.put(updatePersonURL, newPerson)
    return request.then(response => response.data)
}

export default { getAllPersons, addNewPerson, deletePerson, updatePerson }
