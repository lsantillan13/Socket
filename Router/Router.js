/* Imports*/
const express = require("express");
const Rutas = require('../Rutas/Routes.js');

const router = express.Router();
const rutas = new Rutas();

/*Routes collection*/
 router.post('/productos/guardar', rutas.guardar);
 router.get('/productos/listar', rutas.listar);
 router.get('/productos/listar/:id', rutas.listarId);
 router.put('/productos/actualizar/:id', rutas.actualizar);
 router.delete('/productos/borrar/:id', rutas.borrar);
 router.get('/productos/vista', rutas.vistas);
   module.exports = router;
