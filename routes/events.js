const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

// Events Routes -> /api/events

// Todas tienen que pasar por la validacion del JWT
router.use(validarJWT);

// Obtener los eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validarCampos,
  ],
  crearEvento
);

// Actualizar evento
router.put('/:id', actualizarEvento);

// Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;
