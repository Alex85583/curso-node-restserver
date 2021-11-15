const { response } = require("express");
const { Producto } = require('../models')

// Obtener los productos
const obtenerProductos = async( req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const estado = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments( estado ),
        Producto.find( estado )
            .populate( 'usuario', 'nombre')
            .populate( 'categoria', 'nombre')
            .skip( Number( desde ) )
            .limit( Number( limite ) )
    ]);

    res.json({
        total,
        productos
    })

}

const obtenerProducto = async( req, res = response ) => {

    const { id } = req.params;

    const producto = await Producto.findById( id )
                            .populate( 'usuario', 'nombre')
                            .populate( 'categoria', 'nombre')
    
    res.json( producto );

}

const crearProducto = async( req, res = response ) => {

    const { estado, usuario, ...body } = req.body;
    
    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if( productoDB ){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya se encuentra agregado`
        })
    }

    // genera la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuarioAutenticado._id
    }

    const producto = new Producto( data );

    await producto.save();

    res.status(201).json({
        msg: 'Se creo correctamente',
        producto 
    });

}

const actualizarProducto = async(req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    
    if( data.nombre ){
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuarioAutenticado._id;

    const productoActualizado = await Producto.findByIdAndUpdate( id, data, { new: true } );

    res.json({
        msg: 'Producto editado correctamente',
        productoActualizado
    });

}

const borrarProducto = async(req, res = response) => {

    const { id } = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json({
        msg: 'Producto eliminado correctamente',
        productoBorrado
    });

}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto, 
    borrarProducto
}