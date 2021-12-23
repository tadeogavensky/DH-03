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

let totalByCategory = []

const productosAPIController = {
    menu: (req, res) => {
        let respuesta = {
            meta: {
                listaCompleta: 'http://localhost:4000/api/products/',
                listaNombre: 'http://localhost:4000/api/products/list',
                ultimoProducto: 'http://localhost:4000/api/products/lastProduct',
                totalPorCategoria: 'http://localhost:4000/api/products/totalByCategory',
                totalProducto: 'http://localhost:4000/api/products/totalProducts',
                totalMarcas: 'http://localhost:4000/api/products/totalBrands',
                totalCategorias: 'http://localhost:4000/api/products/totalCategories',
                totalSubcategorias: 'http://localhost:4000/api/products/totalSubcategories',
            },
        }
        res.json(respuesta);
    },
    list: (req, res) => {
        let pageToSearch = req.query.page
        if (pageToSearch) {
            db.Producto.count({
                where: {
                    deleted: 0
                }
            }).then(totalProducts => {


                let page = parseInt(req.query.page)
                let next = Number.parseInt(page) + 1
                let previous = Number.parseInt(page) - 1

                if (page == 0) {
                    previous = totalProducts - 1
                } else if (page == (totalProducts - 1)) {
                    next = 0
                }


                let productos = db.Producto.findAll({
                    limit: 10,
                    offset: page,
                    where: {
                        deleted: 0
                    },
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

                let total = db.Categoria.count({
                    include: [{
                        association: 'producto',
                        where: {
                            deleted: 0
                        },
                    }],
                    group: ['nombre'],
                })
                Promise.all([productos, total])
                    .then(([productos, total]) => {

                        total.forEach(objCat => {

                            let cat = total.find(obj =>
                                obj.nombre == objCat.nombre
                            )
                            totalByCategory.push({
                                [cat.nombre]: cat.count
                            })
                        })


                        productos.forEach(productoObj => {
                            productoObj.dataValues.detalle = 'http://localhost:4000/api/products/detail/' + productoObj.id //Detalle producto


                        });


                        let respuesta = {
                            meta: {
                                status: 200,
                                url: 'api/products',
                                listaCompleta: 'http://localhost:4000/api/products',
                                nextPage: 'http://localhost:4000/api/products?page=' + next,
                                previousPage: 'http://localhost:4000/api/products?page=' + previous,
                                menu: 'http://localhost:4000/api/products/menu',

                            },
                            data: {
                                total: productos.length,
                               /*  totalByCategory, */
                                productos
                            }
                        }
                        res.json(respuesta);
                    }).catch((error) => console.log(error));
            }).catch((error) => console.log(error));
        } else{
            let productos = db.Producto.findAll({
                where: {
                    deleted: 0
                },
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

            let total = db.Categoria.count({
                include: [{
                    association: 'producto',
                    where: {
                        deleted: 0
                    }
                }],
                group: ['nombre'],
            })
            Promise.all([productos, total])
                .then(([productos, total]) => {

                    total.forEach(objCat => {

                        let cat = total.find(obj =>
                            obj.nombre == objCat.nombre
                        )
                        totalByCategory.push({
                            [cat.nombre]: cat.count
                        })
                    })


                    /* 
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
                    } */


                    productos.forEach(productoObj => {
                        productoObj.dataValues.detalle = 'http://localhost:4000/api/products/detail/' + productoObj.id //Detalle producto

                        //Array de relaciones
                        /* productoObj.dataValues.imagen = 'http://localhost:4000/img/products/' + productoObj.imagen */ //Imagen producto
                        /* productoObj.dataValues.relaciones = [productoObj.marca, productoObj.categoria, productoObj.subcategoria] //Array de relaciones
                        delete productoObj.dataValues.categoria
                        delete productoObj.dataValues.subcategoria
                        delete productoObj.dataValues.marca */

                        //Se cambian los nombres de los atributos 'nombre'
                        /*productoObj.dataValues.relaciones[0].dataValues.marca = productoObj.dataValues.relaciones[0].dataValues.nombre // on productos create new key name. Assign old value to this
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
                            menu: 'http://localhost:4000/api/products/menu',

                        },
                        data: {
                            total: productos.length,
                            totalByCategory,
                            productos
                        }
                    }
                    res.json(respuesta);
                }).catch((error) => console.log(error));
        }
    },

    productDetail: (req, res) => {
        db.Producto.findOne({
                where: {
                    id: req.params.id,
                    deleted: 0
                },
                attributes: {
                    exclude: ['fkCategoria', 'fkSubCategoria', 'fkMarca','deleted']
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
                        productos: 'http://localhost:4000/api/products',
                        menu: 'http://localhost:4000/api/products/menu',
                    },
                    data: producto
                }
                res.json(respuesta);
            });
    },
    totalProducts: (req, res) => {
        db.Producto.count({
            where: {
                deleted: 0
            }
        }).then(total => {
            let respuesta = {
                meta: {
                    status: 200,
                    productos: 'http://localhost:4000/api/products',
                    menu: 'http://localhost:4000/api/products/menu',
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
                    productos: 'http://localhost:4000/api/products',
                    menu: 'http://localhost:4000/api/products/menu',
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
                    productos: 'http://localhost:4000/api/products',
                    menu: 'http://localhost:4000/api/products/menu',
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
                    productos: 'http://localhost:4000/api/products',
                    menu: 'http://localhost:4000/api/products/menu',
                },
                data: total
            }
            res.json(respuesta);
        });
    },
    lastProduct: (req, res) => {
        db.Producto.findOne({
            where: {
                deleted: 0
            },
            limit: 1,
            attributes: {
                exclude: ['fkCategoria', 'fkSubCategoria', 'fkMarca','deleted']
            },
            order: [
                ['id', 'DESC']
            ],
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
        }).then(producto => {
            producto.dataValues.imagen = 'http://localhost:4000/img/products/' + producto.imagen
            let respuesta = {
                meta: {
                    status: 200,
                    productos: 'http://localhost:4000/api/products',
                    menu: 'http://localhost:4000/api/products/menu',
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
                    productos: 'http://localhost:4000/api/products',
                    menu: 'http://localhost:4000/api/products/menu',
                },
                data: totalByCategory
            }
            res.json(respuesta);
        });
    },
    productList: (req, res) => {
        let pageToSearch = req.query.page
        if (pageToSearch) {
            db.Producto.count({
                where: {
                    deleted: 0
                }
            }).then(totalProducts => {
                
                let page = parseInt(req.query.page)
                let next = Number.parseInt(page) + 1
                let previous = Number.parseInt(page) - 1
    
                if (page == 0) {
                    previous = totalProducts - 1
                } else if (page == (totalProducts - 1)) {
                    next = 0
                }
    
                db.Producto.findAll({
                    limit:10,
                    offset: page,
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
                            productos: 'http://localhost:4000/api/products',
                            totalList: 'http://localhost:4000/api/products/list',
                            nextPage: 'http://localhost:4000/api/products/list?page=' + next,
                            previousPage: 'http://localhost:4000/api/products/list?page=' + previous,
                            menu: 'http://localhost:4000/api/products/menu',
                        },
                        data: productos
                    }
                    res.json(respuesta);
                });
    
            })
        }else{
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
                        products: 'http://localhost:4000/api/products',
                        menu: 'http://localhost:4000/api/products/menu',
                    },
                    data: productos
                }
                res.json(respuesta);
            });
        }
      
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
    },
    /* listByPage: (req, res) => {
        db.Producto.count({
            where: {
                deleted: 0
            }
        }).then(total => {

            console.log(`total`, total)

            let page = Number.parseInt(req.query.page)
            let next = Number.parseInt(page) + 1
            let previous = Number.parseInt(page) - 1


            console.log(`page`, page)
            console.log(`next`, next)
            console.log(`previous`, previous)

            if (page == 0) {
                previous = total - 1
            } else if (page == (total - 1)) {
                next = 0
            }


            db.Producto.findAll({
                limit: 10,
                offset: page,
                where: {
                    deleted: 0,
                },
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
                    }
                ]

            }).then(productos => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: 'api/products/page',
                        nextPage: 'http://localhost:4000/api/products/page?page=' + next,
                        previousPage: 'http://localhost:4000/api/products/page?page=' + previous,
                        menu: 'http://localhost:4000/api/products/menu',
                    },
                    data: {
                        total: productos.length,
                        productos
                    }
                }
                res.json(respuesta);
            }).catch((error) => console.log(error));
        })

    } */
}
module.exports = productosAPIController;