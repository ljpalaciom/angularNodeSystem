var mongoose = require('mongoose');

module.exports = mongoose.model('ArduinoData', {
    temperature: { type: Number, min:-273.15}, // Celsius
    humidity: { type: Number },
    geolocation: { // https://developers.google.com/maps/documentation/geolocation/intro
        location :{
            lat: { type: Number, min: -90, max: 90 },
            lng: { type: Number, min: -180, max: 180 },
        },
        accuracy: { type: Number, min: 0},
    }

});
