const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        // verifica si el token del usuario logeado es correcto o no ha sido modificado
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // console.log(uid);

        // leer el usuario que corresponde al uid
        const usuarioAutenticado = await Usuario.findById( uid );

        // si el id del usuario logeado no existe
        if( !usuarioAutenticado ){
            return res.status(401).json({
                msg: 'Token no valido - usuario borrado DB'
            });
        }

        // verificar si el usuario tiene el estado en true
        if( !usuarioAutenticado.estado ){
            return res.status(401).json({
                msg: 'Token no valido - Este usuario tiene el estado en false'
            });
        }

        req.usuarioAutenticado = usuarioAutenticado;

        next();

    } catch (error) {
        payload
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })

    }

}

module.exports = {
    validarJWT
}