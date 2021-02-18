const express = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const router = express.Router();
const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const {validarJWT} = require('../middlewares/validar-jwt');


router.post('/new',[
    
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Debe ingresar un email valido').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
    validarCampos

], crearUsuario);

router.post('/',[

    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'Debe ingresar un email valido ').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
    validarCampos

], loginUsuario);

router.get('/renew',validarJWT, revalidarToken);



module.exports = router;


// this.router.post('/new',[ 
//     check('name', 'El nombre es obligatorio').not().isEmpty(),
//     check('email', 'El email es obligatorio').isEmail()
//     .custom(async value => {
//         const emailCheck = await getUserByEmail(value);
//         if (!!emailCheck) 
//           return Promise.reject();                
//     }).withMessage('Email ya se encuentra registrado'),
//     check('password')
//         .isLength({ min: 5 }).withMessage('El password debe ser de 5 caracteres')
//         .matches(/\d/).withMessage('El password debe contener al menos un número')
// ], 
// validator,
// authController.register);