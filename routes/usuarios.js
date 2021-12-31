const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const router = Router();

router.get('/', usuariosGet)

router.post('/', [
    check('correo', 'El correo no es valido').isEmail(), // * <- Middleware para verificar que el correo es valido
], usuariosPost)

router.put('/:id', usuariosPut)

router.patch('/', usuariosPatch)

router.delete('/', usuariosDelete)

module.exports = router;
