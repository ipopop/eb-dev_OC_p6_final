'use strict'

const router = require('express').Router()

router.post('/signup', (req, res) => { res.send("POST req on 'signup'") })
router.post('/login', (req, res) => { res.send("POST req on 'login'") })
router.get('/logout', (req, res) => { res.send("GET req on 'logout'") })

module.exports = router
