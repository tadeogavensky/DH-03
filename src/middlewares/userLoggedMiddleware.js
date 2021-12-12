const db = require ("../database/models");
const Op = require("sequelize").Op;

function userLoggedMiddleware (req,res,next){
    
    res.locals.isLogged = false; //Res.locals son variables que se comparten en todas las vistas sin importar el controlador.

    /***Gestión de cookies ANTES de aplicar session***/
    let emailInCookie = req.cookies.userEmail;
    db.Usuario.findOne({
        where: {
            email: emailInCookie
        }
    }).then((result) => {
        let userFromCookie = result;
        if (result != null) {
            req.session.usuario = userFromCookie;
        }
        if (req.session && req.session.usuario) {
            res.locals.isLogged = true;
            res.locals.usuario = req.session.usuario; //Paso a locals los datos de la sesión para poder usarlos a nivel global
        }
    }).catch((error) => { })
    next();
}
module.exports = userLoggedMiddleware;