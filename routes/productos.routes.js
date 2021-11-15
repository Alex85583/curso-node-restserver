const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos.controller');

const { existeProductoPorID, existeCategoriaPorID  } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

router.get('/',  obtenerProductos );

router.get('/:id',  [
    check('id').isMongoId(),
    check('id').custom( existeProductoPorID )
], obtenerProducto );

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorID ),
    validarCampos
], crearProducto );

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeProductoPorID ),
    check('categoria', 'No es un id valido').isMongoId(),
    check('categoria').custom( existeCategoriaPorID ),
    validarCampos
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeProductoPorID ),
    check('categoria').custom( existeCategoriaPorID ),
    validarCampos
], borrarProducto);

module.exports = router;