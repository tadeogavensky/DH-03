const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const {
    Op
} = require("sequelize");
const moment = require('moment');


const usuariosAPIController = {
    'listar': (req, res) => {
        db.Usuario.findAll({
                where: {
                    deleted: 0
                },
                attributes: {
                    exclude: ['password']
                }
            })
            .then(usuarios => {

                usuarios.forEach(usuarioObj => {
                    usuarioObj.dataValues.detalle = 'http://localhost:4000/api/usuarios/' + usuarioObj.id
                    usuarioObj.dataValues.imagen = 'http://localhost:4000/img/users/'+usuarioObj.imagen
                });
         

                let respuesta = {
                    meta: {
                        status: 200,
                        total: usuarios.length,
                        url: 'api/usuarios'
                    },
                    data: {

                        usuarios

                    }
                }
                res.json(respuesta);
            }).catch((error) => console.log(error));
    },

    'detalleUsuario': (req, res) => {
        db.Usuario.findOne({
                where: {
                    id: req.params.id,
                    deleted: 0
                },
                attributes: {
                    exclude: ['password', 'fkRol', 'deleted']
                }
            })
            .then(usuario => {
                usuario.dataValues.imagen = 'http://localhost:4000/img/users/'+usuario.imagen
                let respuesta = {
                    meta: {
                        status: 200,
                        total: usuario.length,
                        usuarios: '/api/usuarios'
                    },
                    data: usuario
                }
                res.json(respuesta);
            });
    },
}

module.exports = usuariosAPIController;