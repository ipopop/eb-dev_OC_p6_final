'use strict'

const express = require('express')

require('./database/dbConnect')

const saucesRoutes = require('./routes/sauces')
const userRoutes = require('./routes/users')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/sauces', saucesRoutes)
app.use('/api/auth', userRoutes)

module.exports = app
