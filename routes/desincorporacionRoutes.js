const express = require('express');
const router = express.Router();
// controller
const controllers = require('../controllers/desincorporacionController');

// POST
router.post('/datos-Motivo',controllers.addMotivo);
router.post('/datos-Informante',controllers.addInformante);
// GET
router.get('/motivos-list',controllers.getMotivo);
router.get('/informante-list',controllers.getInformante);

// DELETE
router.delete('/delete-Motivo/:idMotivo',controllers.deleteMotivo);
router.delete('/delete-Motivo/:idInformante',controllers.deleteInformante);


module.exports= router;
