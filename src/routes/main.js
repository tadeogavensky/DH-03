const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
   body,
   check
} = require('express-validator');

const loggedMiddleware = require('../middlewares/loggedMiddleware')
const notLoggedMiddleware = require('../middlewares/notLoggedMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware');


/////////////////////MULTER///////////////////
const uploadProducts = require('../middlewares/multerProducts')

const storageUser = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './public/img/');
   },
   filename: function (req, file, cb) {
      cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
      cb(null, file.originalname)
   },
   fileFilter: (req, file, cb) => {
      if (file.mimetype === 'image/jpeg' ||
         file.mimetype === 'image/png' ||
         file.mimetype === 'image/gif' ||
         file.mimetype === 'image/jpg') {
         cb(null, true);
      } else {
         req.fileValidationError = 'El archivo deberá ser de formato JPG, JPEG, PNG o GIF';
         return cb(null, false, new Error('El archivo deberá ser de formato JPG, JPEG, PNG o GIF'));
      }
   },
})



const uploadUsers = multer({
   storage: storageUser
});


//EXPRESS VALIDATOR

let dataCheckLogin = [
   check('email').notEmpty().withMessage('Debes completar el campo de email').bail()
   .isEmail().withMessage('Debes completar el campo con un email válido'),
   check('password').notEmpty().withMessage('Debes completar el campo de contraseña').bail()
]
let dataCheckAgregarProducto = [
   check('nombre').notEmpty().withMessage('Debes completar el campo de nombre').bail()
   .isLength({
      min: 5
   }).withMessage('El nombre del producto deberá tener al menos 5 caracteres'),
   check('descripcion').isLength({
      min: 20
   }).withMessage('La descripción del producto debe tener al menos 20 caracteres.'),
   check('precio').notEmpty().withMessage('Debes completar el campo de precio').bail()
   .isNumeric().withMessage('El precio debe ser un número').bail()
   .isInt({
      min: 1
   }).withMessage('El precio debe ser positivo'),
   check('categoria').notEmpty().withMessage('Debes elegir una categoría'),
   check('sub_categoria').notEmpty().withMessage('Debes elegir una subcategoría'),
]

let dataCheckRegister = [
   check('nombre').notEmpty().withMessage('Debes completar el campo de nombre').bail().isLength({
      min: 2
   }).withMessage('El nombre debe tener más de 2 carácteres'),
   check('apellido').notEmpty().withMessage('Debes completar el campo de apellido').bail().isLength({
      min: 2
   }).withMessage('El nombre debe tener más de 2 carácteres'),
   check('usuario').notEmpty().withMessage('Debes completar el campo de usuario'),
   check('email').notEmpty().withMessage('Debes completar el campo de email').bail()
   .isEmail().withMessage('Debes completar el campo con un email válido'),
   check('domicilio').notEmpty().withMessage('Debes completar el campo de domicilio'),
   check('imagen')
   .custom((value, {
      req
   }) => {
      let file = req.file;
      if (!file) {
         throw new Error('Debes completar el campo de foto de perfil');
      } else {
         let fileExtension = path.extname(file.originalname);
         if (fileExtension.match(/.(jpg|jpeg|png|gif)$/i)) {
            throw new Error('La foto de perfil deberá ser de formato JPG, JPEG, PNG o GIF')
         }
      }
      return true;
   }),
   check('password').notEmpty().withMessage('Debes completar el campo de contraseña').bail()
   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).withMessage('La contraseña debe tener más de 8 carácteres, un número, una letra mayúscula y una letra minúscula'),
   check('passwordConfirmar').notEmpty().withMessage('Debes completar el campo de repetir contraseña').bail()
   .custom((value, {
      req,
      loc,
      path
   }) => {
      if (value !== req.body.password) {
         throw new Error("Las contraseñas deben coincidir");
      } else {
         return value;
      }
   }),

]




let dataCheckEditarUsuario = [
   check('nombreEditado').isLength({
      min: 2
   }).withMessage('El nombre debe tener al menos 2 carácteres'),

   check('apellidoEditado').isLength({
      min: 2
   }).withMessage('El apellido debe tener al menos 2 carácteres'),

   check('emailEditado').isEmail().withMessage('Debes completar el campo con un email válido'),

   check('imagen')
   .custom((value, {
      req
   }) => {
      let file = req.file;
      let fileExtension = path.extname(file.originalname);
      if (fileExtension.match(/.(jpg|jpeg|png|gif)$/i)) {
         throw new Error('La imagen deberá ser de formato JPG, JPEG, PNG o GIF')
      }
      return true;
   }),



]

let dataCheckEditarProducto = [
   check('nombre').notEmpty()
   .isLength({
      min: 5
   }).withMessage('El nombre del producto deberá tener al menos 5 caracteres'),
   check('descripcion').isLength({
      min: 20
   }).withMessage('La descripción del producto debe tener al menos 20 caracteres.'),
   check('precio').isNumeric().withMessage('El precio debe ser un número').bail()
   .isInt({
      min: 1
   }).withMessage('El precio debe ser positivo'),

   check('imagen')
   .custom((value, {
      req
   }) => {
      let file = req.file;

      if (fileExtension.match(/.(jpg|jpeg|png|gif)$/i)) {
         throw new Error('La imagen deberá ser de formato JPG, JPEG, PNG o GIF')
      }

      return true;
   }),



]



let dataCheckRecuperar = [


   check('emailRecuperado').notEmpty().withMessage('Debes completar el campo de email').bail()
   .isEmail().withMessage('Debes completar el campo con un email válido'),
   check('passwordRecuperado').notEmpty().withMessage('Debes completar el campo de contraseña').bail()
   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).withMessage('La contraseña debe tener más de 8 carácteres, un número, una letra mayúscula y una letra minúscula'),
   check('passwordConfirmar').notEmpty().withMessage('Debes completar el campo de repetir contraseña').bail()
   .custom((value, {
      req,
      loc,
      path
   }) => {
      if (value !== req.body.passwordRecuperado) {
         throw new Error("Las contraseñas deben coincidir");
      } else {
         return value;
      }
   }),

]






/////////////////////MAIN CONTROLLER///////////////////
const mainController = require("../controllers/mainController.js")
router.get("/", mainController.index) //home




/////////////////////PRODUCTOS CONTROLLER///////////////////
const productosController = require("../controllers/productosController.js")
router.get("/productos", productosController.lista) //todos los productos
router.get("/detalleProducto/:id", uploadProducts.single("imagen"), productosController.detalleProducto) //unProducto


//Carrito de productos
router.get("/cart", notLoggedMiddleware, productosController.cart)
router.post('/cart/:id', uploadProducts.single("imagen"), productosController.agregarAlCarrito)
router.delete('/cart/:id', productosController.eliminarCart);

// Agregar un producto 
router.get("/agregar", notLoggedMiddleware, adminMiddleware, productosController.agregar)
router.post('/productos', uploadProducts.single("imagen"), dataCheckAgregarProducto, productosController.guardar);

// Editar un producto 
router.get('/editar/:id', notLoggedMiddleware, adminMiddleware, productosController.editar);
router.put('/detalleProducto/:id', dataCheckEditarProducto, uploadProducts.single("imagen"), productosController.actualizar);


// Eliminar un producto 
router.delete('/productos/:id', productosController.eliminar);

//Filtrar Home



//Buscar
router.post('/productosBuscados', uploadProducts.single("imagen"), productosController.buscar);
router.post('/productosBuscados/:nombreCategoria', uploadProducts.single("imagen"), mainController.productoPorCategoria);
router.post('/productosBuscadosPorMarca/:nombreMarca', uploadProducts.single("imagen"), mainController.productoPorMarca);
router.post('/productosBuscadosPorSubCategoria/:nombreCategoria', uploadProducts.single("imagen"), mainController.productoPorSubCategoria);




/////////////////////USUARIOS CONTROLLER///////////////////
const usuariosController = require('../controllers/usuariosController');

// Registrarse
router.get('/register', loggedMiddleware, usuariosController.formRegister);
router.post('/log', dataCheckRegister, uploadUsers.single("imagen"), usuariosController.registrarse);

// Iniciar Sesión
router.get('/login', loggedMiddleware, usuariosController.formLogin);
router.post('/', dataCheckLogin, usuariosController.inciarSesion);

//Usuarios
router.get('/log', adminMiddleware, uploadUsers.single("imagen"), usuariosController.logs)

//Cerrar Sesión
router.get('/logout', usuariosController.logout);

//Eliminar Cuenta
router.delete('/log', usuariosController.eliminarCuenta);

//Mi Cuenta
router.get('/perfil', notLoggedMiddleware, uploadUsers.single("imagen"), usuariosController.perfil)
router.get('/noSession', usuariosController.noSession)
router.get('/noAdmin', usuariosController.noAdmin)

//Recuperar contraseña
router.get('/recuperar', usuariosController.recuperarForm)
router.put('/login', dataCheckRecuperar, usuariosController.recuperar)

//Editar cuenta
router.get('/editarUsuario', notLoggedMiddleware, usuariosController.editar)
router.put('/', dataCheckEditarUsuario, uploadUsers.single("imagen"), usuariosController.actualizar)



module.exports = router;