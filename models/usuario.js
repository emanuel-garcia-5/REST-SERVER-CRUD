const {Schema, model} = require('mongoose');

// {
//     nombre: '',
//     correo: '',
//     password: '',
//     img: '',
//     rol: '',
//     estate: false,
//     google: false

// }

const usuarioSchema = Schema({

    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        enum:[]
        
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
       default: false
    },
});

usuarioSchema.methods.toJSON = function () {
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
}

module.exports = model('Usuario', usuarioSchema);