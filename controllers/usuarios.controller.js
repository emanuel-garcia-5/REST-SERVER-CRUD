const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');



const usuariosGet = async (req, res = response) => {


    const { limite = 10, desde = 0 } = req.query;
    if(desde === NaN) desde = 0;

    const query = {estado: true};

const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
        .limit(Number(limite))
        .skip(Number(desde))

]);


    res.json({
        total,
        usuarios
    })
}

const usuariosPut = async (req, res) => {

    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validor contra base de datos
    if (password) {

        const salt = bcryptjs.genSaltSync();

        resto.password = bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario)
}

const usuariosPost = async (req, res) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });


    //Encriptar la contraseña

    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en db


    await usuario.save();
    res.json({
        ok: true,
        msg: "post API - controlador",
        usuario

    })
}

const usuariosDelete =async (req, res) => {

    const id = req.params.id;
    //borrar usuario de la base de datos
   // const usuario = await Usuario.findByIdAndDelete(id)

   const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        usuario
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}