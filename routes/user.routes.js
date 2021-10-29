const { Router } = require('express');
const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuarioPatch, 
    usuariosDelete 
} = require('../controllers/user.controllers');

const router = Router();

router.get('/', usuariosGet ); 

router.post('/', usuariosPost ); 

router.put('/:id', usuariosPut ); 

router.patch('/', usuarioPatch ); 

router.delete('/', usuariosDelete ); 

module.exports = router;