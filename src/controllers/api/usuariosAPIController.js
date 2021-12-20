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
                attributes: {
                    exclude: ['password']
                }
            })
            .then(usuarios => {


                usuarios.map(obj => ({
                    ...obj,
                    detail: 'http://localhost:4000/api/usuarios/' + 1
                }))


                let respuesta = {
                    meta: {
                        status: 200,
                        total: usuarios.length,
                        id: usuarios.id,
                        name: usuarios.nombre,
                        surname: usuarios.apellido,
                        email: usuarios.email,
                        url: 'api/usuarios'
                    },
                    data: {
                        usuarios,

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
                let respuesta = {
                    meta: {
                        status: 200,
                        total: usuario.length,
                        url: '/api/usuario/:id'
                    },
                    data: usuario
                }
                res.json(respuesta);
            });
    },
}

module.exports = usuariosAPIController;