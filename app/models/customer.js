'use strict'

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

const customerSchema = new Schema({
  firstName: String,
  lastName: String,
  creationDate: Date,
  website: String
})

// On utilise le module 'mongoose-auto-increment' pour définir un id qui s'incrémente à partir de 0
// https://github.com/chevex-archived/mongoose-auto-increment
autoIncrement.initialize(mongoose.connection)
customerSchema.plugin(autoIncrement.plugin, 'Customer')

module.exports = mongoose.model('Customer', customerSchema)
