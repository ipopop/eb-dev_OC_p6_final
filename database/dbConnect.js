'use strict'

const mongoose = require('mongoose')

const pe = process.env
mongoose.connect(`
  mongodb+srv://${pe.ADMIN_ID}:${pe.ADMIN_PSW}@${pe.DB_CLUSTER}/${pe.DB_URL_OPTIONS}
  `, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Successful connection to MongoDB'))
  .catch(() => console.log('Connection to MongoDB failed'))


// use .gitignore for the secret file '.env' with secret variables :

// DB_USER_ID = "my-user-id"
// DB_USER_PASSWD = "my-secret-password"
// DB_CLUSTER = "name-of-cluster.mongodb.net"
// DB_URL_OPTIONS = "here-is-options"
