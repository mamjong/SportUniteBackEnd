const AccountController = require('../controllers/account_controller');

module.exports = (app) => {

	// Account routes

	app.get('/api/account', AccountController.get);
	app.get('/api/account/:username', AccountController.getOne);
	app.post('/api/account', AccountController.post);
	app.put('/api/account/:username', AccountController.put);
	app.delete('/api/account/:username', AccountController.deleteOne);
	app.get('/api/account/login', AccountController.login);

};