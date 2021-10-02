module.exports = arr = [];
/* Instructions  */
const express = require('express');
const router = require('./Router/Router.js');
const handlebars = require('express-handlebars');

const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const axios = require('axios');


/*Server up*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('port', process.env.PORT || 8080);
http.listen(app.get('port'), () => {
    console.log('server on port',  app.get('port'));
});

/*Router*/
const Rutas = require('./Rutas/Routes.js');
const { Socket } = require('socket.io');
const rutas = new Rutas();
app.use('/api', router);
app.use(express.static(path.join(__dirname, 'Public')));

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
const fakeAPI = () => { return arr };
let msj = {Productos: fakeAPI(), listExist: arr.length != 0 ? true : false}
io.on('connection', (socket) => {
    // const ipAddress = JSON.stringify(socket.request.connection._peername);
    console.log('alguien se está conectando');

    /*Recibo producto*/
    socket.on('products:send', (data) => {
        console.log(data)
        io.sockets.emit('products:send', data)
    })

    socket.on('message:send', (data) => {
        io.sockets.emit('message:send', data)
    })

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    })
});
