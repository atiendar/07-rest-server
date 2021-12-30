const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario') // <- Llmamos así la clase para crear instancias

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
    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })

    // Verificar si el correo existe en la DB

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
