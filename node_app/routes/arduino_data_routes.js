var Controller = require('../controllers/arduino_data_controller');
var middleware = require('../middleware')

module.exports = function (app) {
   app.get('/api/data', middleware.ensureAuthenticated, Controller.listArduinoData);
   app.post('/api/data', middleware.ensureApiKey, Controller.setArduinoData);	
};