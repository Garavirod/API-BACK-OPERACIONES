const express = require('express');
const router = express.Router();
// controller
const controllers = require('../controllers/desincorporacionController');

// POST
router.post('/datos-motivo',controllers.addMotivo);
router.post('/datos-informante',controllers.addInformante);
// GET
router.get('/motivos-list',controllers.getMotivo);
router.get('/informante-list',controllers.getInformante);

// DELETE
router.delete('/delete-motivo/:idMotivo',controllers.deleteMotivo);
router.delete('/delete-informante/:idInformante',controllers.deleteInformante);


module.exports= router;
