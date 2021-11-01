
const Role = require('../models/rol');
const Usuario = require('../models/usuario');


const esRoleValido = async( rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${rol} no esta registrado en la DB`)
    }
}

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ){
        throw new Error(`El correo: ${correo} esta registrado en la DB`)
    }

}

const existeUsuarioPorID = async( id = '' ) => {

    // Verificar si el correo existe
    const existeID = await Usuario.findById( id );
    if( !existeID ){
        throw new Error(`El id: ${id} no existe en la DB`)
    }

}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorID
}