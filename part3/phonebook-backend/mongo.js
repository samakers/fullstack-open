const mongoose = require('mongoose')

// Retrieve command line arguments
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

// MongoDB Atlas connection string
const url = `mongodb+srv://samakers1:${password}@cluster0.k5gbmwj.mongodb.net/phonebookApp?retryWrites=true&w=majority`

// Disable strict query mode
mongoose.set('strictQuery', false)

// Connect to MongoDB database
mongoose.connect(url)

// Define the Person model using the personSchema
const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
  // If there are not enough command line arguments, retrieve and display all persons
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person)
    })
    mongoose.connection.close()
    process.exit(1)
  })
} else {
  // Create a new person and save it to the database
  const person = new Person({
    person: `${name}`,
    phoneNumber: `${number}`,
  })

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
