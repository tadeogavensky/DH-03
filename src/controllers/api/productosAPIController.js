const path = require('path');
const db = require('../../database/models');
const Sequelize = db.sequelize;
const {
    Op
} = require("sequelize");
const moment = require('moment');
const {
    actualizar
} = require('../productosController');


const productosAPIController = {
    list: (req, res) => {

        let productos = db.Producto.findAll({
            attributes: {
                exclude: ['fkCategoria', 'fkSubCategoria', 'fkMarca', 'precio', 'stock', 'enOferta', 'deleted', 'imagen']
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


                productos.forEach(productoObj => {
                    productoObj.dataValues.detalle = 'http://localhost:4000/api/products/detail/' + productoObj.id //Detalle producto
                   
                    //Array de relaciones
                    /* productoObj.dataValues.imagen = 'http://localhost:4000/img/products/' + productoObj.imagen */ //Imagen producto
                    /* productoObj.dataValues.relaciones = [productoObj.marca, productoObj.categoria, productoObj.subcategoria] //Array de relaciones
                    delete productoObj.dataValues.categoria
                    delete productoObj.dataValues.subcategoria
                    delete productoObj.dataValues.marca */

                    //Se cambian los nombres de los atributos 'nombre'
                  /*productoObj.dataValues.relaciones[0].dataValues.marca = productoObj.dataValues.relaciones[0].dataValues.nombre // on object create new key name. Assign old value to this
                    delete productoObj.dataValues.relaciones[0].dataValues.nombre
                    productoObj.dataValues.relaciones[1].dataValues.categoria = productoObj.dataValues.relaciones[1].dataValues.nombre // on object create new key name. Assign old value to this
                    delete productoObj.dataValues.relaciones[1].dataValues.nombre
                    productoObj.dataValues.relaciones[2].dataValues.subcategoria = productoObj.dataValues.relaciones[2].dataValues.nombre // on object create new key name. Assign old value to this
                    delete productoObj.dataValues.relaciones[2].dataValues.nombre */


                });


                let respuesta = {
                    meta: {
                        status: 200,
                        url: 'api/products',

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

    productDetail: (req, res) => {
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
                //Array de relaciones
               /*  producto.dataValues.relaciones = [
                    producto.categoria,
                    producto.subcategoria,
                    producto.marca
                ]
                delete producto.dataValues.categoria
                delete producto.dataValues.subcategoria
                delete producto.dataValues.marca */

                //Se cambian los nombres de los atributos 'nombre'
                /* producto.dataValues.relaciones[0].dataValues.categoria = producto.dataValues.relaciones[0].dataValues.nombre // on object create new key name. Assign old value to this
                delete producto.dataValues.relaciones[0].dataValues.nombre
                producto.dataValues.relaciones[1].dataValues.subcategoria = producto.dataValues.relaciones[1].dataValues.nombre // on object create new key name. Assign old value to this
                delete producto.dataValues.relaciones[1].dataValues.nombre
                producto.dataValues.relaciones[2].dataValues.marca = producto.dataValues.relaciones[2].dataValues.nombre // on object create new key name. Assign old value to this
                delete producto.dataValues.relaciones[2].dataValues.nombre */


                let respuesta = {
                    meta: {
                        status: 200,
                        productos: 'http://localhost:4000/api/products'
                    },
                    data: producto
                }
                res.json(respuesta);
            });
    },
    totalProducts: (req, res) => {
        db.Producto.count().then(total => {
            let respuesta = {
                meta: {
                    status: 200,
                    productos: 'http://localhost:4000/api/products'
                },
                data: total
            }
            res.json(respuesta);
        });
    },
    totalCategories: (req, res) => {
        db.Categoria.count().then(total => {
            let respuesta = {
                meta: {
                    status: 200,
                    productos: 'http://localhost:4000/api/products'
                },
                data: total
            }
            res.json(respuesta);
        });
    },
    totalSubcategories: (req, res) => {
        db.SubCategoria.count().then(total => {
            let respuesta = {
                meta: {
                    status: 200,
                    productos: 'http://localhost:4000/api/products'
                },
                data: total
            }
            res.json(respuesta);
        });
    },
    totalBrands: (req, res) => {
        db.Marca.count().then(total => {
            let respuesta = {
                meta: {
                    status: 200,
                    productos: 'http://localhost:4000/api/products'
                },
                data: total
            }
            res.json(respuesta);
        });
    },
    lastProduct: (req, res) => {
        db.Producto.findAll({
            where: {
                deleted: 0
            },
            limit: 1,
            order: [
                ['id', 'DESC']
            ]
        }).then(producto => {
            let respuesta = {
                meta: {
                    status: 200,
                    productos: 'http://localhost:4000/api/products'
                },
                data: producto
            }
            res.json(respuesta);
        });
    },
    totalByCategory: (req, res) => {
        db.Categoria.count({
            include: [{
                association: 'producto',
            }],
            group: ['nombre'],
        }).then(totalByCategory => {
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
            let respuesta = {
                meta: {
                    status: 200,
                    productos: 'http://localhost:4000/api/products'
                },
                data: totalByCategory
            }
            res.json(respuesta);
        });
    },
    productList: (req, res) => {
        db.Producto.findAll({
            where: {
                deleted: 0
            },
            attributes: {
                exclude: ['id', 'descripcion', 'fkCategoria', 'fkSubCategoria', 'fkMarca', 'precio', 'stock', 'enOferta', 'deleted', 'imagen']
            },
        }).then(productos => {
            let respuesta = {
                meta: {
                    status: 200,
                    productos: 'http://localhost:4000/api/productos'
                },
                data: productos
            }
            res.json(respuesta);
        });
    },
    create: (req, res) => {
        db.Producto
            .create({
                nombre: req.body.nombre,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                imagen: req.file ? req.file.filename : '',
                stock: req.body.stock ? req.body.stock = 1 : req.body.stock = 0,
                fkSubCategoria: req.body.sub_categoria,
                fkCategoria: req.body.categoria,
                fkMarca: req.body.marca,
                enOferta: req.body.oferta ? req.body.oferta = 1 : req.body.oferta = 0,
                deleted: 0
            })
            .then(create => {
                let respuesta;
                if (create) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: create.length,
                            url: 'api/products/create'
                        },
                        data: create
                    }
                } else {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: create.length,
                            url: 'api/products/create'
                        },
                        data: create
                    }
                }
                res.json(respuesta);
            })
            .catch(error => res.send(error))
    },
    update: (req, res) => {
        db.Producto.update({
                nombre: /* req.body.nombre.length <= 0 ? producto.nombre : */ req.body.nombre,
                precio: /*  req.body.precio.length <= 0 ? producto.precio :  */ req.body.precio,
                descripcion: /* req.body.descripcion.length <= 0 ? producto.descripcion : */ req.body.descripcion,
                imagen: /* req.file ?  */ req.file.filename /* : producto.imagen */ ,
                stock: req.body.stock /* ? req.body.stock = 1 : req.body.stock = 0 */ ,
                fkCategoria: /* req.body ? */ req.body.categoria /* : producto.fkCategoria */ ,
                fkSubCategoria: /* req.body ?  */ req.body.sub_categoria /* : producto.fkSubCategoria */ ,
                fkMarca: /* req.body ?  */ req.body.marca /*:  producto.fkMarca */ ,
                enOferta: req.body.oferta /* ? req.body.oferta = 1 : req.body.oferta = 0 */ ,
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(update => {
                let respuesta;
                if (update) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: update.length,
                            url: 'api/products/update/:id'
                        },
                        data: update
                    }
                } else {
                    respuesta = {
                        meta: {
                            status: 204,
                            total: update.length,
                            url: 'api/products/update/:id'
                        },
                        data: update
                    }
                }
                res.json(respuesta);
            })
            .catch(error => res.send(error))
    },
    destroy: (req, res) => {
        db.Producto.update({
                deleted: 1
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(deleted => {
                let respuesta;
                if (deleted) {
                    respuesta = {
                        meta: {
                            status: 200,

                            url: 'api/products/delete/:id'
                        },
                        data: deleted
                    }
                } else {
                    respuesta = {
                        meta: {
                            status: 204,
                            url: 'api/products/delete/:id'
                        },
                        data: deleted
                    }
                }
                res.json(respuesta);
            })
            .catch(error => res.send(error))
    }



}
module.exports = productosAPIController;