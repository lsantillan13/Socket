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
http.listen(8080, () => console.log('Escuchando...'));

// const server = http.listen(8080, () => {console.log('Servidor HTPP escuchando en el puerto', server.address().port);});
// server.on('error', error => console.log('Error en el servidor', error));

/*Router*/
const Rutas = require('./Rutas/Routes.js');
const rutas = new Rutas();
app.use('/api', router);
app.use(express.static('Public'));

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

// const {first, second, third} = require('./Public/js/index');

const fakeAPI = () => { return arr };
let msj = {Productos: fakeAPI(), listExist: arr.length != 0 ? true : false}
io.on('connection', (socket) => {
    // const ipAddress = JSON.stringify(socket.request.connection._peername);
    console.log('alguien se está conectando');
    socket.emit('mensaje', 'HOLA PUTO');
    socket.on('notificacion', (data) => {        
        mensajes.push({title: fakeAPI(), mensaje: data})
        io.sockets.emit('atodos', mensajes, arr);
    });
    socket.on('mitexto', (data) => {
        io.sockets.emit('devuelvo', data);
    })
}); 