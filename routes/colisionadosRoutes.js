const express = require('express');
const router = express.Router();


const colisionadosControll = require('../controllers/colisionadosController');

router.post("/registro-afectado",colisionadosControll.registroAfectado);


module.exports = router;