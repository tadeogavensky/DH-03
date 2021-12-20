const express = require('express');
const router = express.Router();
const productosAPIController = require('../../controllers/api/productosAPIController');

//Rutas

router.get('/', productosAPIController.listar);

router.get('/:id', productosAPIController.detalleProducto);


module.exports = router;