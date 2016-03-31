// Inicialización
var express  = require('express'),
    app      = express(),
    mongoose = require('mongoose'),
    port = process.env.PORT || 8080,            // Cogemos el puerto 8080
    url,
    db,
    connect;

// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    url = process.env.OPENSHIFT_MONGODB_DB_URL +
    process.env.OPENSHIFT_APP_NAME;
} else {
    url = '127.0.0.1:27017/' + process.env.OPENSHIFT_APP_NAME;
}

// Connect to mongodb
connect = function () {
    mongoose.connect(url);
};
connect();
db = mongoose.connection;
db.on('error', function(error){
    console.log("Error loading the db - "+ error);
});
db.on('disconnected', connect);

// Configuracion
app.configure(function() {
    app.use(express.static(__dirname + '/public'));        
    app.use(express.logger('dev'));// activamos el log en modo 'dev'
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});

// Cargamos los endpoints
require('./app/routes.js')(app);

// Cogemos el puerto para escuchar
app.listen(port);
console.log("APP por el puerto " + port);