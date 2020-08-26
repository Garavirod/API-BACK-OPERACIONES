const express = require('express');
const router = express.Router();


const colisionadosControll = require('../controllers/colisionadosController');


router.post("/registro-afectado",colisionadosControll.registroAfectado);
router.post("/registro-TrasladoHospital",colisionadosControll.registroTrasladoHospital);
router.post("/registro-DatosSeguro",colisionadosControll.registroDatosSeguro);
router.post("/registro-Evento",colisionadosControll.registroEvento);
router.post("/registro-DatosAmbulancia",colisionadosControll.DatosAmbulancia);


module.exports = router;