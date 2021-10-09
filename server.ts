import express from "express";
import handlebars from 'express-handlebars';
import fs from 'fs';
const router  = require('./Router/Router.js');
import path from 'path';
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('port', process.env.PORT || 8080);
http.listen(app.get('port'), () => {
    console.log('server on port',  app.get('port'));
});

/*Router*/
const Rutas = require('./Rutas/Routes.js');
import Socket from 'socket.io';
import { arr } from "./arr";
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
io.on('connection', (socket: { on: (arg0: string, arg1: { (data: any): void; (data: any): void; (data: any): void; }) => void; broadcast: { emit: (arg0: string, arg1: any) => void; }; }) => {
    // const ipAddress = JSON.stringify(socket.request.connection._peername);
    console.log('alguien se está conectando');

    /*Recibo producto*/
    socket.on('products:send', (data: any) => {
        console.log(data)
        io.sockets.emit('products:send', data)
    });

    /*Envio de mensaje al cliente*/
    socket.on('message:send', (data: any) => {
        io.sockets.emit('message:send', data)
        /*guardado de mensajes*/
        fs.appendFile('Data/data.txt', `${JSON.stringify(data)}`, function (err) {
            if (err) throw err;
            console.log('New messages were appended to file');
          });
    });

    /*El cliente esta escribiendo*/
    socket.on('chat:typing', (data: any) => {
        socket.broadcast.emit('chat:typing', data);
    });
});
