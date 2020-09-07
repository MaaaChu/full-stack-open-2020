const mongoose = require('mongoose')

const dbName = 'phonebook-app'

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@phonebook-app.gn9xo.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
})

const Person = mongoose.model('Person', personSchema)

const countAllEntries = () => {
    let total = 0

    Person.find({}).then(result => {
        result.forEach(() => {
            total += 1
        })
        mongoose.connection.close()
    })

    return total
}

const getNewID = () => countAllEntries() + 1

if (process.argv.length < 4) {
    Person.find({})
        .then(result => {
            console.log('Phonebook:')
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
        .then(() => {
            process.exit(1)
        })
}

const newName = process.argv[3]
const newNumber = process.argv[4]

const person = new Person({
    name: newName,
    number: newNumber,
    id: getNewID()
})

person.save().then(result => {
    console.log(`Added ${result.name} ${result.number} to phonebook`)
    mongoose.connection.close()
})
