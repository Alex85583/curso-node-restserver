const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategorias, obtenerCategorias, obtenercategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias.controller');

const { validarJWT, esAdminRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const { existeCategoriaPorID } = require('../helpers/db-validators');

const router = Router();

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias );

// Obtener una categorias por id - publico
router.get('/:id', [ 
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoriaPorID ),
    validarCampos
 ], obtenercategoria );

// crear categorias - pirvado - cualquier persona con un token valido
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos 
], crearCategorias );

// Actualizar categorias - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoriaPorID ),
    check('nombre', 'El nombre es obligatorio para editar').not().isEmpty(),
    validarCampos
], actualizarCategoria );

// borrar categorias - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoriaPorID ),
    validarCampos
], borrarCategoria );

module.exports = router;