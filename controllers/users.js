'use strict'

const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {
	bcrypt.hash(req.body.password, 10)
	.then(hash => {
		const user = new User({
			email: req.body.email,
			password: hash
		})
		user.save()
		.then(() => res.status(201).json({ message: 'User create' }))
		.catch(err => res.status(400).json({ error: err }))
	})
	.catch(err => res.status(500).json({ error: err }))
}

exports.login = (req, res) => {
	User.findOne({ email: req.body.email })
		.then(user => {
			if (!user) { res.status(401).json({ error: 'User not found' }) }

			bcrypt.compare(req.body.password, user.password)
				.then(valid => {
					if (!valid) { return res.status(401).json({ error: 'Incorrect password' }) }

					res.status(200).json({
						userId: user._id,
						token: jwt.sign(
							{ userId: user._id },
							process.env.JWT_ACCESS_TOKEN_SECRET,
							{ expiresIn: '12h' }
						)
					})
				})
				.catch(err => res.status(500).json({ error: err }))
		})
	.catch(err => res.status(500).json({ error: err }))
}

exports.logout = (req, res) => {
	req.logout((err) => {
		if(err) {
			return console.log(err)
		}
		res.redirect('/')
		.catch(err => res.status(500).json({ error: err }))
	})
	.catch(err => res.status(500).json({ error: err }))
}
