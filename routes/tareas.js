const {Router}= require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const { getTareas, crearTarea, actualizarTarea, eliminarTarea } = require('../controllers/tareas');


const router = Router();


//Todas las peticiones tienen que pasar por validar token
router.use(validarJWT);

// Obtener tareas
router.get('/', getTareas);


// Crear tarea
router.post('/',
    [
        check('desc', 'La descripción es obligatoria').not().isEmpty(),
        validarCampos
    ],
    crearTarea

);

// Actualizar tarea
router.put('/:id', 

    [
        check('desc', 'La descripción es obligatoria').not().isEmpty(),
        validarCampos
    ],
    actualizarTarea

);

// Eliminar tarea
router.delete('/:id', eliminarTarea);



module.exports = router;