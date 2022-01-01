module.exports  = (req,res,next)=>{

    if(req.session.usuario){

        res.redirect('/perfil')
      
    }else{

        next()
    }
}

