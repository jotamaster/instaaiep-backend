require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const { sign } = require('jsonwebtoken');

require('../models/Auth');
const User = require('../models/User');

const router = express.Router();

/**
 * @route POST /auth/login
 * @group Authentication
 * @param {Auth.model} login.body.required
 * @returns {AuthResponse.model} 200
 * @returns {object} 422 - Validation error
 * @returns {any} 401 - Unauthorized
 */
router.post(
	'/login',
	[ check('username').isLength({ min: 4 }), check('password').isLength({ min: 6 }) ],
	async (req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		try {
			const user = await User.query().where('username', req.body.username).first();

			if (user) {
				await bcrypt.compare(req.body.password, user.password, (err, matched) => {
					if (matched) {
						const expire = 60 * 60 * 24;
						const token = sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: expire });

						delete user.password;

						res.json({
							user: user,
							token: token,
							expire_in: expire
						});
					} else {
						res.status(401).json({ message: 'Invalid credentials' });
					}
				});
			} else {
				res.status(401).json({ message: 'Unauthorized' });
			}
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
