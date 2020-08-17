import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAllPersons = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const addNewPerson = (newPerson) => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const deleteURL = `${baseURL}/${id}`
    const request = axios.delete(deleteURL)
    return request.then(response => response.data)
}

const updatePerson = (id, newPerson) => {
    const updatePersonURL = `${baseURL}/${id}`
    const request = axios.put(updatePersonURL, newPerson)
    return request.then(response => response.data)
}

export default { getAllPersons, addNewPerson, deletePerson, updatePerson }
