const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const {
    Op
} = require("sequelize");
const moment = require('moment');


const usuariosAPIController = {
    list: (req, res) => {
        db.Usuario.findAll({
                where: {
                    deleted: 0
                },
                attributes: {
                    exclude: ['password', 'imagen', 'domicilio', 'deleted', 'fkRol', 'usuario']
                }
            })
            .then(usuarios => {

                usuarios.forEach(usuarioObj => {
                    usuarioObj.dataValues.detalle = 'http://localhost:4000/api/users/detail/' + usuarioObj.id
                    /*  usuarioObj.dataValues.imagen = 'http://localhost:4000/img/users/'+usuarioObj.imagen */ //Para agregar link a imagen
                });


                let respuesta = {
                    meta: {
                        status: 200,
                        total: usuarios.length,
                        url: 'api/users',
                        menuProductos: 'http://localhost:4000/api/products/menu'
                    },
                    data: {

                        usuarios

                    }
                }
                res.json(respuesta);
            }).catch((error) => console.log(error));
    },

    userDetail: (req, res) => {
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
                usuario.dataValues.imagen = 'http://localhost:4000/img/users/' + usuario.imagen
                let respuesta = {
                    meta: {
                        status: 200,
                        total: usuario.length,
                        usuarios: '/api/users',
                        menuProductos: 'http://localhost:4000/api/products/menu'
                    },
                    data: usuario
                }
                res.json(respuesta);
            });
    },
    userTotal: (req, res) => {
        db.Usuario.count({
            where: {
                deleted: 0
            }
        }).then(total => {
            let respuesta = {
                meta: {
                    status: 200,
                    usuarios: 'http://localhost:4000/api/users',
                    menuProductos: 'http://localhost:4000/api/products/menu'
                },
                data: total
            }
            res.json(respuesta);
        });
    },
    lastUser: (req, res) => {
        db.Usuario.findOne({
            where: {
                deleted: 0
            },
            attributes: {
                exclude: ['password', 'fkRol', 'deleted']
            },
            limit: 1,
            order: [
                ['id', 'DESC']
            ]
        }).then(usuario => {
            console.log(`usuario`, usuario.dataValues.imagen)
            usuario.dataValues.imagen = 'http://localhost:4000/img/users/' + usuario.dataValues.imagen
            let respuesta = {
                meta: {
                    status: 200,
                    productos: 'http://localhost:4000/api/products',
                    menuProductos: 'http://localhost:4000/api/products/menu'
                },
                data: usuario
            }
            res.json(respuesta);
        });
    }
}

module.exports = usuariosAPIController;