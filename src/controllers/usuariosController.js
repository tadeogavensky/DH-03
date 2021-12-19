const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const {
  Op
} = require("sequelize");

const {
  validationResult
} = require("express-validator");

const db = require("../database/models");


const usuariosController = {
  noSession: (req, res) => {
    res.render("noSession");
  },
  noAdmin: (req, res) => {
    res.render("noAdmin");
  },
  formRegister: (req, res) => {
    res.render("register");
  },
  registrarse: (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log('ERRORES')
      console.log(errors)
      res.render("register", {
        errors: errors.errors
      });

    } else {
      db.Usuario.findOne({
        where: {
          email: req.body.email,
        }
      }).then(usuario => {
        if (usuario) {
          let emailExist = 'Email ya registrado'

          res.render("register", {
            emailExist
          });

        } else {


          db.Usuario.create({
              nombre: req.body.nombre,
              apellido: req.body.apellido,
              usuario: req.body.usuario,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 10),
              domicilio: req.body.domicilio,
              imagen: req.file ? req.file.filename : '',
              fkRol: 2,
            })
            .then(() => {
              return res.redirect("/");
            })
            .catch((error) => res.send(error));
        }
      })

    }
  },
  formLogin: (req, res) => {
    res.render("login");
  },
  inciarSesion: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

      res.render("login", {
        errors: errors.errors
      });

    } else {

      db.Usuario.findOne({
        where: {
          email: req.body.email,
          deleted: 0,
        }
      }).then((usuario) => {

        if (usuario != undefined) {
          if (bcrypt.compareSync(req.body.password, usuario.password)) {

            if (req.body.recordar == "on") {
              res.cookie('userEmail', req.body.email, {
                maxAge: (1000 * 60) * 2
              })

            }


            /*  delete usuario.password; */

            req.session.usuario = usuario;

            let session = req.session.usuario;

            /* let cookieEmail = usuario.email; */



            res.redirect("/");


          } else if ((usuario.email == req.body.email && usuario.passsword != bcrypt.compareSync(req.body.password, usuario.password)) || (usuario.email != req.body.email && usuario.passsword == bcrypt.compareSync(req.body.password, usuario.password))) {
            let notMatch = 'El email y/o la contraseña son incorrectos'
            res.render('login', {
              notMatch
            });
          }
        } else {
          let notExist = 'El usuario no existe'
          res.render('login', {
            notExist
          });
        }
      }).catch((error) => console.log(error));
    }
  },
  logout: (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy();
    res.redirect("/");
  },
  eliminarCuenta: (req, res) => {
    let session = req.session.usuario;
    /*  console.log(session); */
    db.Usuario.update({
      deleted: 1,
    }, {
      where: {
        id: session.id,
      },
    }).then(res.redirect("/"));
    req.session.destroy();
  },
  perfil: (req, res) => {
    let session = req.session.usuario;
    /*  console.log("SESSION PERFIL");
     console.log(session); */
    res.render("perfil", {
      session: session,
    });
  },
  editar: (req, res) => {
    const session = req.session.usuario;
    console.log("ID SESSION EDITAR");
    console.log(session);




    res.render("editarUsuario", {
      session: session,
    });



  },
  actualizar: (req, res) => {
    const session = req.session.usuario;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

      res.render("editarUsuario", {
        errors: errors.errors,
        session
      });

    } else {
      db.Usuario.findAll({
          where: {
            deleted: 0,
            email: {
              [Op.ne]: session.email
            }
          },
        })
        .then(usuarios => {
          console.log('TODOS LOS EMAILS MENOS SESSION')
          console.log(usuarios)
       
          usuarios.forEach(usuario => {
            if (req.body.email == usuario.emailEditado) {
              let emailExist = 'Email ya registrado'
              res.render("editarUsuario", {
                emailExist,
                session
              });
            } else {

              db.Usuario.update({
                  nombre: req.body.nombreEditado.length == 0 ? session.nombre : req.body.nombreEditado,
                  apellido: req.body.apellidoEditado.length == 0 ? session.apellido : req.body.apellidoEditado,
                  usuario: req.body.usuarioEditado.length == 0 ? session.usuario : req.body.usuarioEditado,
                  email: req.body.emailEditado.length == 0 ? session.email : req.body.emailEditado,
                  domicilio: req.body.domicilioEditado.length == 0 ? session.domicilio : req.body.domicilioEditado,
                  imagen: req.file ? req.file.filename : session.imagen,
                  password: session.password
                }, {
                  where: {
                    id: session.id
                  }
                }).then(() => {

                  return db.Usuario.findByPk(session.id)

                }).then(usuario => {

                  console.log('USUARIO EDITADO')
                  console.log(usuario)

                  req.session.usuario = usuario

                  res.redirect("/");

                })
                .catch((error) => res.send(error));





            }
          })

        })
    }

  },
  logs: (req, res) => {
    let session = req.session.usuario;
    db.Usuario.findAll({
      where: {
        deleted: 0,
      },
    }).then((usuarios) => {
      res.render("log", {
        usuarios: usuarios,
        session: session,
      });
    });
  },
  recuperarForm: (req, res) => {
    res.render("recuperar");
  },
  recuperar: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

      res.render("recuperar", {
        errors: errors.errors
      });

    } else {
      db.Usuario.findOne({
        where: {
          deleted: 0,
          email: req.body.emailRecuperado
        }
      }).then(usuario => {
        if (usuario != undefined && req.body.emailRecuperado.length > 0) {

          db.Usuario.update({
            password: req.body.passwordRecuperado.length > 0 ? bcrypt.hashSync(req.body.passwordRecuperado, 10) : null
          }, {
            where: {
              email: usuario.email
            }
          }).then((edit) => {
            req.session.destroy();
            res.redirect("/login");
          });
        } else {
          let notExist = 'El usuario no existe'
          res.render('recuperar', {
            notExist
          });
        }
      })

    }

  },
};

module.exports = usuariosController;