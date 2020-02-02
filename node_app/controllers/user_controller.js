var User = require('../models/user');
var config = require('../configs/config');
var jwt = require('jsonwebtoken');


exports.getUsers = function (req, res) {
	User.find(
		function (err, users) {
			if (err) {
				return res.status(500).json({
					status: 'error',
					message: 'Something broke!',
				})
			}
			res.json(users);
		}
	);
}

exports.getUser = function (req, res) {
	clean_username = req.params.username;
	User.findOne({ username: clean_username },
		function (err, user) {
			if (err) {
				return res.status(500).json({
					status: 'error',
					message: 'Something broke!',
				})
			}
			res.json(user);
		}
	);
}

exports.setUser = function (req, res) {
	var user = new User(
		{
			username: req.body.username,
			password: req.body.password,
			name: req.body.name,
			age: req.body.age,
			admin: req.body.admin
		});
	user.save(
		function (err, user) {
			if (err) {
				console.log(err)
				return res.status(500).json({
					status: 'error',
					message: 'Something broke!',
				})
			}
			res.json(user);
		});
}

exports.login = function (req, res, next) {

	var query = {
		username: req.body.username,
		password: req.body.password
	}
	User.findOne(query,
		function (err, user) {
			if (err) {
				return res.status(500).json({
					status: 'error',
					message: 'Something broke!',
				})
			}
			
			if (!user) {
				res.status(401).send({ mensaje: "Usuario o contraseña incorrectos" })
			} else {
				const payload = {
					sub: user._id,
					username: user.username,
					admin: user.admin
				};
				const token = jwt.sign(payload, config.secretKey, {
					expiresIn: 60 * 5
				});
				res.json({
					mensaje: 'Autenticación correcta',
					token: token
				});
			}
		}
	);
}





