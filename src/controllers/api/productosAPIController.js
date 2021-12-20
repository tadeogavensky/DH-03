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
                exclude: ['fkCategoria', 'fkSubCategoria', 'fkMarca', 'precio', 'stock', 'enOferta', 'deleted','imagen']
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
            group: ['nombre'],
            

        })
        Promise.all([productos, totalByCategory])
            .then(([productos, totalByCategory]) => {

                console.log('totalByCategory')
                /* totalByCategory.dataValues.relaciones[0].dataValues.Categoria = totalByCategory.dataValues.relaciones[0].dataValues.nombre // on object create new key name. Assign old value to this
                delete totalByCategory.dataValues.relaciones[0].dataValues.nombre */
                totalByCategory[0].categoria = totalByCategory[0].nombre
                delete totalByCategory[0].nombre
                totalByCategory[1].categoria = totalByCategory[1].nombre
                delete totalByCategory[1].nombre
                totalByCategory[2].categoria = totalByCategory[2].nombre
                delete totalByCategory[2].nombre
                totalByCategory[3].categoria = totalByCategory[3].nombre
                delete totalByCategory[3].nombre
                totalByCategory[4].categoria = totalByCategory[4].nombre
                delete totalByCategory[4].nombre
                totalByCategory[5].categoria = totalByCategory[5].nombre
                delete totalByCategory[5].nombre

                for (let i = 0; i < totalByCategory.length; i++) {
                    totalByCategory[i].total = totalByCategory[i].count
                    delete totalByCategory[i].count
                }
                    
                console.log(totalByCategory[0])

                productos.forEach(productoObj => {
                    productoObj.dataValues.detalle = 'http://localhost:4000/api/productos/' + productoObj.id //Detalle producto
                    /* productoObj.dataValues.imagen = 'http://localhost:4000/img/products/' + productoObj.imagen */ //Imagen producto
                    productoObj.dataValues.relaciones = [productoObj.categoria, productoObj.subcategoria, productoObj.marca] //Array de relaciones
                    delete productoObj.dataValues.categoria
                    delete productoObj.dataValues.subcategoria
                    delete productoObj.dataValues.marca

                    //Se cambian los nombres de los atributos 'nombre'
                    productoObj.dataValues.relaciones[0].dataValues.categoria = productoObj.dataValues.relaciones[0].dataValues.nombre // on object create new key name. Assign old value to this
                    delete productoObj.dataValues.relaciones[0].dataValues.nombre
                    productoObj.dataValues.relaciones[1].dataValues.subcategoria = productoObj.dataValues.relaciones[1].dataValues.nombre // on object create new key name. Assign old value to this
                    delete productoObj.dataValues.relaciones[1].dataValues.nombre
                    productoObj.dataValues.relaciones[2].dataValues.marca = productoObj.dataValues.relaciones[2].dataValues.nombre // on object create new key name. Assign old value to this
                    delete productoObj.dataValues.relaciones[2].dataValues.nombre

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

                //Se cambian los nombres de los atributos 'nombre'
                producto.dataValues.relaciones[0].dataValues.categoria = producto.dataValues.relaciones[0].dataValues.nombre // on object create new key name. Assign old value to this
                delete producto.dataValues.relaciones[0].dataValues.nombre
                producto.dataValues.relaciones[1].dataValues.subcategoria = producto.dataValues.relaciones[1].dataValues.nombre // on object create new key name. Assign old value to this
                delete producto.dataValues.relaciones[1].dataValues.nombre
                producto.dataValues.relaciones[2].dataValues.marca = producto.dataValues.relaciones[2].dataValues.nombre // on object create new key name. Assign old value to this
                delete producto.dataValues.relaciones[2].dataValues.nombre









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