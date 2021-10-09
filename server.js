'use strict';
const arr = [];
module.exports = arr;
/* Instructions  */
var express = require('express');
var router = require('./Router/Router.js');
var handlebars = require('express-handlebars');
var fs = require('fs');

var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// const axios = require('axios');


/*Server up*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 8080);
http.listen(app.get('port'), function () {
    console.log('server on port', app.get('port'));
});

/*Router*/
var Rutas = require('./Rutas/Routes.js');

var _require = require('socket.io'),
    Socket = _require.Socket;

var _require2 = require('fs'),
    fstat = _require2.fstat;

var rutas = new Rutas();
app.use('/api', router);
app.use(express.static(path.join(__dirname, 'Public')));

/* Handlebars */
app.engine("hbs", handlebars({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + "/Views/layouts",
    partialsDir: __dirname + "/Views/partials"
}));
app.set("view engine", "hbs");
app.set("views", "./Views");

/*WebSocket*/
var mensajes = [];
var fakeAPI = function fakeAPI() {
    return arr;
};
var msj = { Productos: fakeAPI(), listExist: arr.length != 0 ? true : false };
io.on('connection', function (socket) {
    // const ipAddress = JSON.stringify(socket.request.connection._peername);
    console.log('alguien se está conectando');

    /*Recibo producto*/
    socket.on('products:send', function (data) {
        console.log(data);
        io.sockets.emit('products:send', data);
    });

    /*Envio de mensaje al cliente*/
    socket.on('message:send', function (data) {
        io.sockets.emit('message:send', data);
        /*guardado de mensajes*/
        fs.appendFile('Data/data.txt', '' + JSON.stringify(data), function (err) {
            if (err) throw err;
            console.log('New messages were appended to file');
        });
    });

    /*El cliente esta escribiendo*/
    socket.on('chat:typing', function (data) {
        socket.broadcast.emit('chat:typing', data);
    });
});
