const express = require('express');
const router = express.Router();


const colisionadosControll = require('../controllers/colisionadosController');
const controllers = require('../controllers/colisionadosController');


router.post("/registro-afectado/:idEvento",colisionadosControll.registroAfectado);
router.post("/registro-trasladoHospital",colisionadosControll.registroTrasladoHospital);
router.post("/registro-datosSeguro",colisionadosControll.registroDatosSeguro);
router.post("/registro-evento",colisionadosControll.registroEvento);
router.post("/registro-datosAmbulancia",colisionadosControll.registroDatosAmbulancia);
router.get("/eventos", colisionadosControll.getEventos);
router.get("/afectados",controllers.getAfectados);
router.delete("/borra-evento/:idEvento",controllers.borraEvento);
router.delete("/borra-afectado/:idAfectado",controllers.borraAfectado);
router.delete("/borra-traslado-hospital/:idTraslado",controllers.borraTraslado);
router.delete("/borra-datos-seguro/:idSeguro",controllers.borraSeguro);
router.delete("/borra-datos-ambulancia/:idAmbulancia",controllers.borraAmbulancia);

module.exports = router;