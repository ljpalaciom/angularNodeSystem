var config = require('./configs/config');
var jwt = require('jsonwebtoken');

exports.ensureAuthenticated = function (req, res, next) {

    const token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, config.secretKey, (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Token inválida' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token no proveída.'
        });
    }
}

exports.ensureAuthenticatedAdmin = function (req, res, next) {

    const token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, config.secretKey, (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Token inválida' });
            } else if (!decoded.admin) {
                return res.json({ mensaje: 'Debe ser administrador para acceder a este recurso' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token no proveída.'
        });
    }
}

exports.ensureApiKey = function (req, res, next) {
    const token = req.headers['api-key'];
    if (token == config.apiKey) {
        next();
    } else {
    res.send({
        mensaje: 'API-KEY invalido'
    });
}
}
