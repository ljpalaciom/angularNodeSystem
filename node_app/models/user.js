var validator = require('validator')
var mongoose = require('mongoose');
var bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'username invalid'],
        minlength: 4,
        maxlength: 20,
        unique: true
    },

    password: {
        type: String,
        required: [true, "can't be blank"],
        minlength: 5,
        maxlength: 20
    },

    name: {
        type: String,
        required: [true, "can't be blank"],
        minlength: 2,
        maxlength: 20
    },
    email: { type: String, required: [true, "can't be blank"], validate: [validator.isEmail, 'Ingrese un correo valido'] },
    admin: { type: Boolean, default: false }
})

UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});


User = mongoose.model('User', UserSchema);
User.createIndexes();
module.exports = User