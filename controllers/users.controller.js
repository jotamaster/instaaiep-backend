const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const User = require('../models/User');

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

exports.register = async (req, res) => {};
