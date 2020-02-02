var ArduinoData = require('../models/arduino_data');

exports.listArduinoData = function (req, res) {
	ArduinoData.find(
		function (err, listData) {
			if (err) {
				return res.status(500).json({
					status: 'error',
					message: 'Something broke!',
				  })
			}
			res.json(listData);
		}
	);
}

exports.setArduinoData = function (req, res) {
	console.log(req.body.temperature);
	ArduinoData.create(
		{ temperature: req.body.temperature, humidity: req.body.humidity, geolocation: req.body.geolocation},
		function (err, data) {
			if (err) {
				return res.status(500).json({
					status: 'error',
					message: 'Something broke!',
				  })
			}
			res.json(data);
		});
	}
