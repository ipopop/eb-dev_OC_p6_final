'use strict'

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { isEmail } = require('validator')

const userSchema = mongoose.Schema({
  email: { type: String, validate: [ isEmail, 'invalid email' ], required: true, unique: true },
  password: { type: String, required: true }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
