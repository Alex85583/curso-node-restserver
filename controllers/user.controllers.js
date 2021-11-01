
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const completadoEstado = { estado: true };

    // const usuarios =  await Usuario.find(completadoEstado)
    //         .skip( Number( desde ) )
    //         .limit( Number( limite ) );

    // const total = await Usuario.countDocuments(completadoEstado);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(completadoEstado),
        Usuario.find(completadoEstado)
            .skip( Number( desde ) )
            .limit( Number( limite ) )
    ]);

    res.json({ 
        // resp
        total,
        usuarios 
    });
    
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en DB
    await usuario.save();

    res.json({
        usuario
    });

}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if( password ){
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);

}

const usuarioPatch = (req, res = response) => {

    res.json({
        msg: 'Patch API - controlador'
    });

}

const usuariosDelete = async( req, res = response ) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } )

    res.json(usuario);

}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuarioPatch,
    usuariosDelete
}
