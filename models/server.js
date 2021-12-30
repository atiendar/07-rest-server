const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        // * Conexión con la base de datos
        this.conectarDB()

        // * Middlewares
        this.middlewares()

        // * Rutas
        this.routes();
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {
        // * CORS
        this.app.use(cors())

        // * Lectura y parseo del middleware
        this.app.use(express.json())

        this.app.use(express.static('public')) // ! <- Denegando el acceso a la carpeta pública
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en:', this.port)
        })
    }
}

module.exports = Server;
