const { response } = require("express");
const { Categoria } = require('../models');

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const estado = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments( estado ),
        Categoria.find( estado )
            .populate( 'usuario', 'nombre')
            .skip( Number( desde ) )
            .limit( Number( limite ) )
    ]);

    res.json({
        total,
        categorias
    });

}

// obtenercategoria - populate {}
const obtenercategoria = async(req, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findById( id )
                                .populate( 'usuario', 'nombre')

    res.json({
        categoria
    });

}

const crearCategorias = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if( categoriaDB ){
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe  `
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuarioAutenticado._id
    }

    const categoria = new Categoria( data );

    // Guardar DB
    await categoria.save();

    res.status(201).json({
        msg: 'se creo',
        categoria
    })

}

// actualizarCategoria
const actualizarCategoria = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuarioAutenticado._id;

    // el { new: true } es para que me lo preswente actualizado en la res osea en la res.json
    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true } );

    res.json({
        msg: 'Editado correctamente',
        categoria
    });

}

// borrarCategoria - estado : false
const borrarCategoria = async(req, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json({
        msg: 'Eliminado correctamente',
        categoria
    })

}

module.exports = {
    obtenerCategorias,
    obtenercategoria,
    crearCategorias,
    actualizarCategoria,
    borrarCategoria
}