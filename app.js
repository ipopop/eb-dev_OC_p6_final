'use strict'

const express = require('express')

require('./database/dbConnect')

const saucesRoutes = require('./routes/sauces')
const userRoutes = require('./routes/users')
const path = require('path')

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/image', express.static(path.join(__dirname, 'image')))

app.use('/api/sauces', saucesRoutes)
app.use('/api/auth', userRoutes)

module.exports = app
