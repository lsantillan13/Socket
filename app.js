module.exports = arr = [];

/*Require*/
const express = require('express');
const router = require('./Router/Router.js');
const handlebars = require('express-handlebars');

/* Instructions  */
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const server = http.listen(PORT, () => {console.log('Servidor HTPP escuchando en el puerto', server.address().port);});
server.on('error', error => console.log('Error en el servidor', error));

/*Router*/
const Rutas = require('./Rutas/Routes.js');
const rutas = new Rutas();
app.use('/api', router);

/* Handlebars */
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + "/Views/layouts",
        partialsDir: __dirname + "/Views/partials"
    })
);
app.set("view engine", "hbs");
app.set("views", "./Views");

/*WebSocket*/

let mensajes = [];

io.on('connection', (socket) => {
    const ipAddress = JSON.stringify(socket.request.connection._peername);
    console.log('alguien se está conectando desde' + ipAddress);
    socket.emit('mensaje', 'hola, este es un mensaje desde el servidor!');
    socket.on('notificacion', (data) => {
        console.log(arr);
        mensajes.push({socketId: socket.id, mensaje: data})
        io.sockets.emit('atodos', mensajes, arr);
    });
    socket.on('mitexto', (data) => {
        io.sockets.emit('devuelvo', data);
    })
});