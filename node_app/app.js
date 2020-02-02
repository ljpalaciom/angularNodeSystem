'use strict';
// Inicialización
const express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    filter = require('content-filter'),
    app = express();
    
    
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const DB_URL = process.env.DB_URI || 'mongodb://localhost:27017/proyecto1telematicaBD';
// Configuracion mongodb://mongod-container:27017/TelematicApp


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  credentials: true,
}));
app.use(filter()); // To protect from noSQL Injection

app.use(express.static('dist'));


mongoose.connect(DB_URL, { useNewUrlParser: true }, function (err) {
 
  if (err) throw err;

  console.log('Successfully connected to the mongodatabase');

});

// Cargamos los endpoints
require('./routes/user_routes.js')(app);
require('./routes/arduino_data_routes.js')(app);

app.get('*', function (req, res) {
  res.sendfile('./dist/index.html'); // Carga única de la vista
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
