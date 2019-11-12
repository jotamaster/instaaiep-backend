const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const User = require('../models/User');
var emailSecure = require('email-secure');

exports.login = async (req, res) => {
	try {
		const user = await User.query().findOne('username', req.body.username);

		if (!user) return res.status(401).json({ message: 'Unauthorized' });

		await bcrypt.compare(req.body.password, user.password, (err, matched) => {
			if (!matched) return res.status(401).json({ success: false, message: 'Invalid credentials' });

			const expire = 60 * 60 * 24;

			const token = sign({ sub: user.username }, process.env.JWT_SECRET, { expiresIn: expire });

			delete user.password;

			res.json({
				accessToken: token,
				user: user
			});
		});
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

exports.register = async (req, res) => {
	try {
		let username = req.body.username;
		let email = req.body.email;
		let password = req.body.password;

		if (!username && username >= 6) return res.status(409).json({ message: 'Conflict' });

		if (!emailSecure.validateEmail(email)) return res.status(409).json({ message: 'Conflict' });

		if (!password && password >= 6) return res.status(409).json({ message: 'Conflict paswword invalid' });

		const user = await User.query().select('username').where('username', username);

		if (user.length) return res.status(409).json({ message: 'el nombre de usuario ya existe' });

		const emailExist = await User.query().select('email').where('username', email);

		if (emailExist.length) return res.status(409).json({ message: 'el email ya existe' });

		bcrypt.hash(password, 10, async function(err, hash) {
			newUser = await User.query().insert({ username, email, password: hash });
		});

		return res.status(201).json({ message: 'usuario creado exitosamente' });
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};
