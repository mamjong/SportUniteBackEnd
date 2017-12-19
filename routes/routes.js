const AccountController = require('../controllers/account_controller');

module.exports = (app) => {

	// Account routes

	app.get('/api/account', AccountController.get);
	app.post('/api/account/login', AccountController.login);

};