'use strict'

const User = ({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

exports.signup = (req, res) => {
	req.body.password
	.then((pwd) => {
		const user = new User({
			email: req.body.email,
			password: pwd,
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

			if(req.body.password === user.password)
				(valid => {
					if (!valid) { return res.status(401).json({ error: 'Incorrect password' }) }

					res.status(200).json({
						userId: user._id,
						token: jwt.sign(
							{ userId: user._id },
							'RANDOM_TOKEN_SECRET',
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
