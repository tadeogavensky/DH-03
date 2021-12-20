const express = require('express');
const router = express.Router();
const usuariosAPIController = require('../../controllers/api/usuariosAPIController');

//Rutas

router.get('/', usuariosAPIController.list);

router.get('/detail/:id', usuariosAPIController.userDetail);

router.get('/userTotal', usuariosAPIController.userTotal);

router.get('/lastUser', usuariosAPIController.lastUser);




module.exports = router;