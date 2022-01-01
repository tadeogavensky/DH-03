const session = require('express-session');
const fs = require('fs');
const path = require('path');
const {
    validationResult
} = require("express-validator");

//DATABASE
const db = require('../database/models');
const {
    Op
} = require("sequelize");

const Sequelize = require('sequelize');
const sequelize = db.sequelize;


const productoController = {
    buscar: (req, res) => {
        const session = req.session.usuario;

        let queryCategory = req.params.nombreCategoria

        let promiseProducto = db.Producto.findAll({

                where: {
                    deleted: 0,
                    nombre: {
                        [Op.like]: `%${req.body.productoBuscado}%`
                    }
                }
            }


        )
        let promiseCategoria = db.Categoria.findAll();
        let promiseSubCategoria = db.SubCategoria.findAll()
        let promiseMarca = db.Marca.findAll();
        Promise.all([promiseProducto, promiseCategoria, promiseSubCategoria, promiseMarca])
            .then(([lista_productos, categorias, subcategorias, marcas]) => {
                res.render('productosBuscados', {
                    lista_productos,
                    categorias,
                    subcategorias,
                    marcas: marcas,
                    queryCategory,
                    session: session
                })
            })
    },
    lista: (req, res) => {
        const session = req.session.usuario;

        let promiseProductos = db.Producto.findAll({
            where: {
                deleted: 0,
                fkCategoria: {
                    [Op.lte]: 6
                }
            }
        })
        let promiseCategoria = db.Categoria.findAll()
        let promiseSubCategoria = db.SubCategoria.findAll()

        let promiseMarca = db.Marca.findAll()
        Promise.all([promiseProductos, promiseCategoria, promiseSubCategoria, promiseMarca])
            .then(([lista_productos, categorias, subcategorias, marcas]) => {
                res.render('productos', {
                    "lista_productos": lista_productos,
                    categorias,
                    subcategorias,
                    marcas,
                    session: session
                });
            })

    },
    detalleProducto: (req, res) => {
        const session = req.session.usuario;
        db.Producto.findOne({
            where: {
                id: req.params.id,
                deleted: 0
            },
            include: [{
                    model: db.Marca,
                    as: 'marca',
                },
                {
                    model: db.SubCategoria,
                    as: 'subcategoria',
                },
                {
                    model: db.Categoria,
                    as: 'categoria',
                },

            ]
        }).then(producto => {
            if (producto != undefined) {

                let promiseProductoMarca = db.Producto.findAll({
                    where: {
                        deleted: 0,
                        id: {
                            [Op.ne]: producto.id
                        }
                    },
                    include: [{
                        model: db.Marca,
                        as: 'marca',
                        where: {
                            id: producto.fkMarca
                        }
                    }]
                })
                let promiseProductoCategoria = db.Producto.findAll({
                    where: {
                        deleted: 0,
                        id: {
                            [Op.ne]: producto.id
                        }

                    },
                    include: [{
                        model: db.SubCategoria,
                        as: 'subcategoria',
                        where: {
                            id: producto.fkSubCategoria
                        }
                    }]
                })

                let promiseEnOferta = db.Producto.findAll({
                    order: Sequelize.literal('rand()'),
                    where: {
                        enOferta: 1,
                        deleted: 0,
                        id: {
                            [Op.ne]: producto.id
                        }

                    }
                })

                Promise.all([promiseProductoMarca, promiseProductoCategoria, promiseEnOferta])
                    .then(([productosMarca, productosCategoria, productosEnOferta]) => {
                        res.render('detalleProducto', {
                            producto,
                            productosMarca,
                            productosCategoria,
                            productosEnOferta,
                            session: session
                        });
                    })



            } else {
                res.render('productNotExist');
            }
        })


    },
    cart: (req, res) => {
        let session = req.session.usuario;



        db.Carrito.findAll({
            where: {
                id: session.id
            },
            include: [{
                    model: db.Producto,
                    as: 'producto',
                },
                {
                    model: db.Usuario,
                    as: 'usuario',
                },
            ],

        }).then(productosCarrito => {

            res.render('cart', {
                productosCarrito,
                session: session
            })
        })

    },
    eliminarCart: (req, res) => {


    },

    agregar: (req, res) => {
        let promiseCategoria = db.Categoria.findAll();
        let promiseSubCategoria = db.SubCategoria.findAll({
            include: [{
                association: 'categoria'
            }]
        });
        let promiseMarca = db.Marca.findAll();
        Promise.all([promiseCategoria, promiseSubCategoria, promiseMarca])
            .then(([categorias, sub_categorias, marcas]) => {

                res.render('agregar', {
                    categorias,
                    sub_categorias,
                    marcas
                })
            })
            .catch(error => res.send(error))

    },
    guardar: (req, res) => {
        const session = req.session.usuario;

        let promiseCategoria = db.Categoria.findAll();
        let promiseSubCategoria = db.SubCategoria.findAll({
            include: [{
                association: 'categoria'
            }]
        });
        let promiseMarca = db.Marca.findAll();
        Promise.all([promiseCategoria, promiseSubCategoria, promiseMarca])
            .then(([categorias, sub_categorias, marcas]) => {


                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.render("agregar", {
                        errors: errors.errors,
                        categorias,
                        sub_categorias,
                        marcas,
                        session
                    });
                } else {



                    db.Producto.create({
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
                        }).then(() => {
                            return res.redirect('/productos');
                        })
                        .catch(error => res.send(error));
                }
            })
            .catch(error => res.send(error))




    },

    editar: (req, res) => {
        const session = req.session.usuario;
        let promiseCategoria = db.Categoria.findAll();
        let promiseSubCategoria = db.SubCategoria.findAll({
            include: [{
                association: 'categoria',
            }]
        });
        let promiseMarca = db.Marca.findAll();
        let promiseProducto = db.Producto.findByPk(req.params.id, {
            include: [{
                    model: db.Marca,
                    as: 'marca',
                },
                {
                    model: db.SubCategoria,
                    as: 'subcategoria',
                },
                {
                    model: db.Categoria,
                    as: 'categoria',
                },
            ]
        })
        Promise.all([promiseCategoria, promiseSubCategoria, promiseMarca, promiseProducto])
            .then(([categorias, sub_categorias, marcas, producto]) => {
                if (producto != undefined) {
                    res.render('editar', {
                        categorias,
                        sub_categorias,
                        marcas,
                        producto,
                        session: session
                    })
                } else {
                    res.render('productNotExist');
                }

            })
            .catch(error => res.send(error))


    },
    actualizar: (req, res) => {
        const session = req.session.usuario;
        let promiseCategoria = db.Categoria.findAll();
        let promiseSubCategoria = db.SubCategoria.findAll({
            include: [{
                association: 'categoria',
            }]
        });
        let promiseMarca = db.Marca.findAll();
        let promiseProducto = db.Producto.findByPk(req.params.id, {
            include: [{
                    model: db.Marca,
                    as: 'marca',
                },
                {
                    model: db.SubCategoria,
                    as: 'subcategoria',
                },
                {
                    model: db.Categoria,
                    as: 'categoria',
                },

            ]
        })
        Promise.all([promiseCategoria, promiseSubCategoria, promiseMarca, promiseProducto])
            .then(([categorias, sub_categorias, marcas, producto]) => {

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.render("editar", {
                        errors: errors.errors,
                        categorias,
                        sub_categorias,
                        marcas,
                        producto,
                        session
                    });
                } else {

                    db.Producto.findByPk(req.params.id).then(producto => {
                            db.Producto.update({
                                nombre: req.body.nombre.length <= 0 ? producto.nombre : req.body.nombre,
                                precio: req.body.precio.length <= 0 ? producto.precio : req.body.precio,
                                descripcion: req.body.descripcion.length <= 0 ? producto.descripcion : req.body.descripcion,
                                imagen: req.file ? req.file.filename : producto.imagen,
                                stock: req.body.stock ? req.body.stock = 1 : req.body.stock = 0,
                                enOferta: req.body.oferta ? req.body.oferta = 1 : req.body.oferta = 0,
                                fkCategoria: req.body ? req.body.categoria : producto.fkCategoria,
                                fkSubCategoria: req.body ? req.body.sub_categoria : producto.fkSubCategoria,
                                fkMarca: req.body ? req.body.marca : producto.fkMarca,

                            }, {
                                where: {
                                    id: req.params.id
                                }
                            })
                        })
                        .then(res.redirect("/productos"))
                }

            })
            .catch(error => res.send(error))




    },

    filtrar: (req, res) => {

    },


    eliminar: (req, res) => {
        db.Producto.update({
            deleted: 1
        }, {
            where: {
                id: req.params.id
            }
        })
        res.redirect('/productos');
    },


    agregarAlCarrito: (req, res) => {
        const session = req.session.usuario;
        console.log(session.id)
        /* db.CarritoProducto.create({
            
                include:{
                    model: db.Carrito,
                    as: 'carrito',
                   fkCarrito:db.Carrito.fkUsuario
                },
            
            fkProducto: req.params.id
        }).then(a=>{
            respuesta = {a}

            res.json(respuesta)
        }) */
        /* db.Carrito.create({
            fkUsuario: 1,
            include:[
                {
                    model: db.Carrito,
                    as: 'producto',
                    fkCarrito: db.Carrito.id,
                },
            ]
        }) */



    },

}


module.exports = productoController;