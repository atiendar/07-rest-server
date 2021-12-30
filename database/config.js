const mongoose = require('mongoose')

const dbConnection = async() => { // <- Conexión con la base de datos
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Base de datos online')
    } catch (error) {
        console.log(error)
        throw new Error('Error con la conexión a la base de datos')
    }
}

module.exports = {
    dbConnection
}
