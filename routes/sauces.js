'use strict'

const router = require('express').Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const saucesCtrl = require('../controllers/sauces')

router.post('/', auth, multer, saucesCtrl.createOneSauce)
router.post('/:id/like', auth, saucesCtrl.likeOrDislikeSauce)
router.get('/:id', auth, saucesCtrl.getOneSauce)
router.put('/:id', auth, multer, saucesCtrl.modifyOneSauce)
router.delete('/:id', auth, saucesCtrl.deleteOneSauce)
router.get('/', auth, saucesCtrl.getAllSauce)

module.exports = router
