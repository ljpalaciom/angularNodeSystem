var Controller = require('../controllers/user_controller');
var middleware = require('../middleware')
module.exports = function (app) {
	// app.get('/user/:username', Controller.getUser);
	app.get('/api/user',  middleware.ensureAuthenticatedAdmin, Controller.getUsers);	
	app.post('/api/user', Controller.setUser);	
	app.post('/api/login', Controller.login);
};