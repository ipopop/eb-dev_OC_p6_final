'use strict'

const router = require('express').Router()

const userCtrl = require('../controllers/users')

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/logout', userCtrl.logout)

module.exports = router
