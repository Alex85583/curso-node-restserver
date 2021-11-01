const { Router } = require('express');
const { check } = require('express-validator');

const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuarioPatch, 
    usuariosDelete 
} = require('../controllers/user.controllers');
const { esRoleValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet ); 

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de tener mas de 6 letras').isLength({ min: 6 }),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos  
], usuariosPost ); 

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    validarCampos
],usuariosPut ); 

router.patch('/', usuarioPatch ); 

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    validarCampos  
],usuariosDelete ); 

module.exports = router;