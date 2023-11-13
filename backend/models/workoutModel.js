const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  payee: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  user_id:{
    type: String,
    required: true
  },
  message:{
    type: String,
    default: null
  },
  amount:{
    type: Number
  }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)