const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const {
    Op
} = require("sequelize");
const moment = require('moment');


const productosAPIController = {
    'listar': (req, res) => {

      

        let productos = db.Producto.findAll()

        let totalByCategory = db.Categoria.count({
            include: [{
                association: 'producto'
            }],
            group: ['nombre']
        })
        Promise.all([productos, totalByCategory])
            .then(([productos,totalByCategory]) => {


                let respuesta = {
                    meta: {
                        status: 200,
                        total: productos.length,
                        totalByCategory,
                        url: 'api/productos'
                    },
                    data: {
                        productos,

                    }
                }
                res.json(respuesta);
            }).catch((error) => console.log(error));
    },

    'detalleProducto': (req, res) => {
        db.Producto.findOne({
                where: {
                    id: req.params.id,
                    deleted: 0
                }
            })
            .then(producto => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: producto.length,
                        url: 'http://localhost:4000/api/productos'
                    },
                    data: producto
                }
                res.json(respuesta);
            });
    },
}

module.exports = productosAPIController;