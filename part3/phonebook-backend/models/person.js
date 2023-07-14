const mongoose = require('mongoose')

// Disable strict query mode
mongoose.set('strictQuery', false)

// Retrieve the MongoDB connection URI from environment variables
const url = process.env.MONGODB_URI

// Connect to MongoDB database
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Define the personSchema
const personSchema = new mongoose.Schema({
  person: {
    type: String,
    minLength: 3,
    required: true
  },
  phoneNumber: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Create the Person model using the personSchema and export it
module.exports = mongoose.model('Person', personSchema)
