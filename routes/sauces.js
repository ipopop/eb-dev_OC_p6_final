'use strict'

const router = require('express').Router()

const saucesCtrl = require('../controllers/sauces')

router.post('/', saucesCtrl.createOneSauce)
router.post('/:id/like', (req, res) => { res.send("POST req on 'like'") })
router.get('/:id', saucesCtrl.getOneSauce)
router.put('/:id', saucesCtrl.modifyOneSauce)
router.delete('/:id', saucesCtrl.deleteOneSauce)
router.get('/', saucesCtrl.getAllSauce)

module.exports = router
