
const Usuario = require('../models/usuario');
const Role = require('../models/role')


const esRoleValido = async (role = '')=>{
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El rol ${role} no esta registrado en la BD`)
    }
   
}

const existeEmail =async(correo='')=>{ 

    const existe = await Usuario.findOne({ correo });
    if (existe) {
        throw new Error(`El correo: ${correo} ya esta registrado`);
        // return res.status(400).json({
        //     msg: 'El correo ya esta registrado !!'
        // })
    }
}

const existeUsuarioPorId =async(id='')=>{ 

    const usuarioExiste = await Usuario.findById(id);
    if ( !usuarioExiste) {
        throw new Error(`El id: ${id} no pertenece a ningun usuario`);
    }
}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId
}