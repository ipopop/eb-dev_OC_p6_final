'use strict'

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

require('./database/dbConnect')

const saucesRoutes = require('./routes/sauces')
const userRoutes = require('./routes/users')
const path = require('path')
const csrf = require('csurf');

const app = express()
app.use(helmet())
app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/image', express.static(path.join(__dirname, 'image')))

app.use('/api/sauces', saucesRoutes)
app.use('/api/auth', userRoutes)

app.use(csrf())

module.exports = app
