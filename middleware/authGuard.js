require('dotenv').config();

const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const User = require('../models/User');

const passportOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
	passReqToCallback: true
};

const jwtStrategy = new Strategy(passportOptions, async (req, payload, done) => {
	const user = await User.query().omit([ 'password' ]).where('username', payload.username).first();

	if (user) {
		done(null, user);
	} else {
		done(new Error('User not found'), null);
	}
});

passport.use(jwtStrategy);

const authGuard = {
	jwt() {
		return (req, res, next) => {
			passport.authenticate('jwt', { session: false })(req, res, next);
		};
	}
};

module.exports = authGuard;
