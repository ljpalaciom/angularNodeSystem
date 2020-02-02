var ArduinoData = require('../models/arduino_data');

exports.listArduinoData = function (req, res) {

	ArduinoData.find({ user: req.decoded.sub }).populate("user", "username").exec(
		function (err, listData) {
			if (err) {
				return res.status(500).json({
					status: 'error',
					message: err.message
				})
			}
			res.json(listData);
		}
	);

}

exports.setArduinoData = function (req, res) {
	User.findOne({ username: req.body.user }).exec()
		.then(function (user) {
			if (!user) {
				return res.status(401).json({
					status: 'error',
					message: "Usuario desconocido",
				})
			}
			
			ArduinoData.create(
				{ temperature: req.body.temperature, humidity: req.body.humidity, geolocation: req.body.geolocation, user: user },
				function (err, data) {
					if (err) {
						return res.status(500).json({
							status: 'error',
							message: err.message
						})
					}
					res.json(data);
				});

		});
	}


