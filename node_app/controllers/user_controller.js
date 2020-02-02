var User = require('../models/user');
var config = require('../configs/config');
var jwt = require('jsonwebtoken');
var bcrypt = require("bcrypt");

exports.getUsers = function (req, res) {
	User.find(
		function (err, users) {
			if (err) {
				return res.status(500).json({
					status: 'error',
					message: err.message
				})
			}
			res.json(users);
		}
	);
}

exports.getUser = function (req, res) {
	User.findOne({ username: req.params.username },
		function (err, user) {
			if (err) {
				return res.status(500).json({
					status: 'error',
					message: err.message,
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
			email: req.body.email
		});
	user.save(
		function (err, user) {
			if (err) {
				return res.status(500).json({
					status: 'error',
					message: err.message,
				})
			}
			res.json(user);
		});
}

exports.login = function (req, res) {
	User.findOne({ username: req.body.username },
		function (err, user) {
			if (err) {
				return res.status(500).json({
					status: 'error',
					message: err.message,
				})
			}

			if (!user) {
				return res.status(401).json({
					status: 'error',
					message: "Usuario desconocido",
				})			
			} else {
				try {
					isMatch = bcrypt.compareSync(req.body.password, user.password);
				} catch (error) {					
					return res.status(500).json({
						status: 'error',
						message: "Error autenticando",
					})
				}
				if (!isMatch) {
					return res.status(401).json({
						status: 'error',
						message: "Contrasena incorrecta",
					})
				}
				const payload = {
					sub: user._id,
					username: user.username,
					admin: user.admin
				};
				console
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





