const express = require('express');
const router = express.Router();
const usuariosAPIController = require('../../controllers/api/usuariosAPIController');

//Rutas

router.get('/', usuariosAPIController.listar);

router.get('/:id', usuariosAPIController.detalleUsuario);


module.exports = router;