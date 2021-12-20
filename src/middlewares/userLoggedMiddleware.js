const db = require ("../database/models");
const Op = require("sequelize").Op;

function userLoggedMiddleware (req,res,next){
    
    res.locals.isLogged = false; 

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
            res.locals.usuario = req.session.usuario; 
        }
    }).catch((error) => { })
    next();
}
module.exports = userLoggedMiddleware;