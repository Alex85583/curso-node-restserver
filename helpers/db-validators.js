
const Role = require('../models/rol');
const { Categoria, Usuario, Producto } = require('../models')

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

    // Verificar si el usuario existe
    const existeID = await Usuario.findById( id );
    if( !existeID ){
        throw new Error(`El id: ${id} no existe en la DB`)
    }

}

const existeCategoriaPorID = async( id = '' ) => {

    // verifica si la categoria existe
    const existeCategoriaID = await Categoria.findById( id );
    if( !existeCategoriaID ){
        throw new Error(`El id: ${id} no existe en la DB `)
    }

}

const existeProductoPorID = async( id = '' ) => {

    // verifica si la categoria existe
    const existeProductoID = await Producto.findById( id );
    if( !existeProductoID ){
        throw new Error(`El id: ${id} no existe en la DB `)
    }

}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorID,
    existeCategoriaPorID,
    existeProductoPorID
}