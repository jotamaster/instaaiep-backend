module.exports = function(app) {
	const userController = require('../controllers/users.controller');

	app.post('/api/login', userController.login);
	app.post('/api/register', userController.register);
};
