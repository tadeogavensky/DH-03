const fs = require('fs');
const path = require('path');
const {
	setEnvironmentData
} = require('worker_threads');
const db = require('../database/models');
const {
	lista
} = require('./productosController');
const Sequelize = require('sequelize');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {
	index: (req, res) => {
		const session = req.session.usuario;
		
		console.log(req.session.usuario)
		console.log(session)
	

		let promiseProducto = db.Producto.findAll({
			where: {
				deleted: 0,
				enOferta: 1
			}

		})
		let promiseCategoria = db.Categoria.findAll();
		let promiseSubCategoria = db.SubCategoria.findAll()
		let promiseMarca = db.Marca.findAll();

		Promise.all([promiseProducto, promiseCategoria, promiseSubCategoria, promiseMarca])
			.then(([lista_productos, categorias, subcategorias, marcas]) => {
				res.render('index', {
					lista_productos,
					categorias,
					subcategorias,
					marcas: marcas,
					session: session
				})
			})
			.catch(error => res.send(error))
	},
	productoPorCategoria: (req, res) => {
		const session = req.session.usuario;

		let promiseProductos = db.Producto.findAll({
			where: {
				deleted: 0
			},
			include: [{
				model: db.Categoria,
				as: 'categoria',
				where: {
					nombre: req.params.nombreCategoria
				}
			}]
		})
		let promiseCategoria = db.Categoria.findAll()
		let promiseSubCategoria = db.SubCategoria.findAll()
		let promiseMarca = db.Marca.findAll()

		let queryCategory = req.params.nombreCategoria

		console.log('QUERY STRING')
		console.log(queryCategory)

		Promise.all([promiseProductos, promiseCategoria, promiseSubCategoria, promiseMarca])
			.then(([lista_productos, categorias, subcategorias, marcas]) => {
				/* console.log(lista_productos) */
				res.render('productosBuscados', {
					lista_productos,
					categorias,
					subcategorias,
					marcas,
					queryCategory,
					session: session
				})
			}).catch(error => console.log(error))
	},
	productoPorSubCategoria: (req, res) => {
		const session = req.session.usuario;

		let querySubCategory = req.params.nombreCategoria

		let promiseProductos = db.Producto.findAll({
			where: {
				deleted: 0
			},
			include: [{
				model: db.SubCategoria,
				as: 'subcategoria',
				where: {
					nombre: req.params.nombreCategoria
				}
			}]
		})
		let promiseCategoria = db.Categoria.findAll()
		let promiseSubCategoria = db.SubCategoria.findAll()
		let promiseMarca = db.Marca.findAll()
		Promise.all([promiseProductos, promiseCategoria, promiseSubCategoria, promiseMarca,querySubCategory])
			.then(([lista_productos, categorias, subcategorias, marcas]) => {

				res.render('productosBuscadosPorSubcategoria', {
					lista_productos,
					categorias,
					subcategorias,
					marcas,
					querySubCategory,
					session: session
				})
			}).catch(error => console.log(error))
	},
	productoPorMarca: (req, res) => {
		const session = req.session.usuario;

		let queryBrand = req.params.nombreMarca

		let promiseProductos = db.Producto.findAll({
			where: {
				deleted: 0
			},
			include: [{
				model: db.Marca,
				as: 'marca',
				where: {
					nombre: req.params.nombreMarca
				}
			}]
		})
		let promiseCategoria = db.Categoria.findAll()
		let promiseSubCategoria = db.SubCategoria.findAll()
		let promiseMarca = db.Marca.findAll()
		Promise.all([promiseProductos, promiseCategoria, promiseSubCategoria, promiseMarca,queryBrand])
			.then(([lista_productos, categorias, subcategorias, marcas]) => {

				res.render('productosBuscadosPorMarca', {
					lista_productos,
					categorias,
					subcategorias,
					marcas,
					queryBrand,
					session: session
				})
			}).catch(error => console.log(error))
	}

}

module.exports = mainController;