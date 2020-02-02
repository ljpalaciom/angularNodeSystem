var mongoose = require('mongoose');

User = mongoose.model('User', {
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
        minlength: 3,
        maxlength: 20
    },

    name: {
        type: String,
        required: [true, "can't be blank"],
        minlength: 2,
        maxlength: 20
    },
    age: { type: Number, required: [true, "can't be blank"], min: 5, max: 110 },
    admin:  { type: Boolean, default:false}
});
User.createIndexes();
module.exports = User