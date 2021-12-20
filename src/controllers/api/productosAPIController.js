const path = require('path');
const db = require('../../database/models');
const Sequelize = db.sequelize;
const {
    Op
} = require("sequelize");
const moment = require('moment');


const productosAPIController = {
    'listar': (req, res) => {
        let productos = db.Producto.findAll({
            attributes: {
                exclude: ['fkCategoria', 'fkSubCategoria', 'fkMarca', 'precio', 'stock', 'enOferta', 'deleted']
            },
            include: [{
                    model: db.Marca,
                    as: 'marca',
                    attributes: {
                        exclude: ['id']
                    }
                },
                {
                    model: db.Categoria,
                    as: 'categoria',
                    attributes: {
                        exclude: ['id', 'imagen']
                    }
                },
                {
                    model: db.SubCategoria,
                    as: 'subcategoria',
                    attributes: {
                        exclude: ['id', 'fkCategoria']
                    }
                },
            ]
        })

        let totalByCategory = db.Categoria.count({
            include: [{
                association: 'producto',
            }],
            group: ['nombre']

        })
        Promise.all([productos, totalByCategory])
            .then(([productos, totalByCategory]) => {

                console.log('totalByCategory')
                console.log(productos)

                productos.forEach(productoObj => {
                    productoObj.dataValues.detalle = 'http://localhost:4000/api/productos/' + productoObj.id
                    productoObj.dataValues.imagen = 'http://localhost:4000/img/products/' + productoObj.imagen
                    /*   productoObj.dataValues.relaciones =[productoObj.categoria,productoObj.subcategoria,productoObj.marca]
                      delete productoObj.dataValues.categoria
                      delete productoObj.dataValues.subcategoria
                      delete productoObj.dataValues.marca */
                });


                let respuesta = {
                    meta: {
                        status: 200,
                        url: 'api/productos',

                    },
                    data: {
                        total: productos.length,
                        totalByCategory,
                        productos
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
                },
                attributes: {
                    exclude: ['fkCategoria', 'fkSubCategoria', 'fkMarca']
                },
                include: [{
                        model: db.Marca,
                        as: 'marca',
                        attributes: {
                            exclude: ['id']
                        }
                    },
                    {
                        model: db.Categoria,
                        as: 'categoria',
                        attributes: {
                            exclude: ['id', 'imagen']
                        }
                    },
                    {
                        model: db.SubCategoria,
                        as: 'subcategoria',
                        attributes: {
                            exclude: ['id', 'fkCategoria']
                        }
                    },
                ],

            })
            .then(producto => {

                producto.dataValues.imagen = 'http://localhost:4000/img/products/' + producto.imagen
                producto.dataValues.relaciones = [
                    producto.categoria,
                    producto.subcategoria,
                    producto.marca
                ]
                delete producto.dataValues.categoria
                delete producto.dataValues.subcategoria
                delete producto.dataValues.marca

                let respuesta = {
                    meta: {
                        status: 200,
                        total: producto.length,
                        productos: 'http://localhost:4000/api/productos'
                    },
                    data: producto
                }
                res.json(respuesta);
            });
    },
}

module.exports = productosAPIController;