'use strict'

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)
    const userId = decodedToken.userId
    const uID = req.body.userId

    if (uID && uID !== userId) { throw 'Invalid user ID' } next()
  }

  catch {
    res.status(401).json({ error: new Error('Invalid request') })
  }
}
