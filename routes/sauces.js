'use strict'

const router = require('express').Router()

router.post('/', (req, res) => { res.send("POST req on 'home'") })
router.post('/:id/like', (req, res) => { res.send("POST req on 'like'") })
router.get('/:id', (req, res) => { res.send("GET req on 'id'") })
router.put('/:id', (req, res) => { res.send("PUT req on 'id'") })
router.delete('/:id', (req, res) => { res.send("DELETE req on 'id'") })
router.get('/', (req, res) => { res.send("GET req on 'home'") })

module.exports = router
