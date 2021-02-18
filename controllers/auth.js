const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const {generarJWT} = require('../helpers/jwt');

const crearUsuario = async (req, res) => {

    const {email, password} = req.body;

    try {

        let usuario = await Usuario.findOne({email});

        if(usuario) {
            return res.status(400).json({
                ok: false,
                message: 'Un usuario ya existe con ese correo electronico'
            });
        }

        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar token
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            message: 'Por favor hable con el administrador'
        })
    }

    
    
};


const loginUsuario = async(req, res) => {

    const {email, password} = req.body;

    try {

        const usuario = await Usuario.findOne({email});

        if(!usuario) {
            return res.status(400).json({
                ok: false,
                message: `El usuario con ese email no existe`
            });
        }

        // Confirmar contraseñas
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Password incorrecto'
            })
        }

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            message: 'Por favor hable con el administrador'
        })
    }

};


const revalidarToken = async(req, res) => {

    const {uid, name} = req;

    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
};



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}