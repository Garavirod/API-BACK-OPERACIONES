const express = require('express');
const router = express.Router();


const colisionadosControll = require('../controllers/colisionadosController');


router.post("/registro-afectado",colisionadosControll.registroAfectado);
router.post("/registro-trasladoHospital",colisionadosControll.registroTrasladoHospital);
router.post("/registro-datosSeguro",colisionadosControll.registroDatosSeguro);
router.post("/registro-evento",colisionadosControll.registroEvento);
router.post("/registro-datosAmbulancia",colisionadosControll.registroDatosAmbulancia);
router.get("/eventos", colisionadosControll.getEventos);


module.exports = router;