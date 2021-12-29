const express = require('express')
const cors = require('cors')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT

        // * Middlewares
        this.middlewares()

        // * Rutas
        this.routes();
    }

    middlewares() {
        // * CORS
        this.app.use(cors())

        this.app.use(express.static('public')) // ! <- Denegando el acceso a la carpeta pública
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.json({
                msg: 'get API'
            })
        })

        this.app.put('/api', (req, res) => {
            res.status(400).json({
                msg: 'put API'
            })
        })

        this.app.post('/api', (req, res) => {
            res.status(201).json({
                msg: 'post API'
            })
        })

        this.app.delete('/api', (req, res) => {
            res.json({
                msg: 'delete API'
            })
        })

        this.app.patch('/api', (req, res) => {
            res.json({
                msg: 'patch API'
            })
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en:', this.port)
        })
    }
}

module.exports = Server;
