const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario') // * <- Llamamos así la clase para crear instancias
const { validationResult } = require('express-validator')

const usuariosGet = (req = request, res = response) => {
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query

    res.json({
        msg: 'get API - usuariosGet',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPost = async(req, res = response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })

    // Verificar si el correo existe en la DB
    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        })
    }

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(10); // <- Nivel de complejidad de una contraseña (mayor número == más tardado)
    usuario.password = bcrypt.hashSync(password, salt) // <- Contraseña encriptada

    // Guardar en la DB
    await usuario.save()

    res.json({
        msg: 'post API - usuariosPost',
        usuario
    })
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id

    res.json({
        msg: 'put API - usuariosPut',
        id
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
