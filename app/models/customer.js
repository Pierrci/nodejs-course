'use strict'

let mongoose = require('mongoose')
let autoIncrement = require('mongoose-auto-increment')
let Schema = mongoose.Schema

let customerSchema = new Schema({
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
