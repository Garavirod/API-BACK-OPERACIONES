const express = require('express');
const router = express.Router();

const controllers = require('../controllers/lesionadosController');


router.post("/registro-afectado/:idEvento",controllers.registroAfectado);
router.post("/registro-trasladoHospital/:idAfectado",controllers.registroTrasladoHospital);
router.post("/registro-datosSeguro/:idEvento",controllers.registroDatosSeguro);
router.post("/registro-evento",controllers.registroEvento);
router.post("/registro-datosAmbulancia/:idEvento",controllers.registroDatosAmbulancia);
router.post("/registro-afectado-traslado/:idEvento",controllers.addAfectadoTraslado);
router.get("/eventos", controllers.getEventos);
router.get("/afectados/:idEvento",controllers.getAfectados);
router.get("/datoseguros/:idEvento", controllers.getDatosSeguro);
router.get("/datosambulancias/:idEvento",controllers.getDatosAmbulancia);
router.get("/traslados/:idEvento",controllers.getTraslados);
router.delete("/borra-evento/:idEvento",controllers.borraEvento);
router.delete("/borra-afectado/:idAfectado",controllers.borraAfectado);
router.delete("/borra-traslado-hospital/:idTraslado",controllers.borraTraslado);
router.delete("/borra-datos-seguro/:idSeguro",controllers.borraSeguro);
router.delete("/borra-datos-ambulancia/:idAmbulancia",controllers.borraAmbulancia);

module.exports = router;
