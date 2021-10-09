const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../DB/config.db');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        //conectar a la base de datos 
        this.conectarDB();
        //Middlewares
       // this.app.use(express.static(__dirname + '/public'))

       this.middlewares();

        //rutas de aplicacion

        this.routes();
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){

        //CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json())

        //Directorio Publico
        this.app.use(express.static('public'));
        
    }

    routes() {

        
      this.app.use(this.usuariosPath, require('../routes/user.routes'))

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log("servidor corriendo en el puerto: ", this.port)
        });
    }

}

module.exports = Server;