const express = require('express');
const router = express.Router();

const controller = require('../controllers/desincorporacionController');
const controllers = require('../controllers/desincorporacionController');

// POST
router.post('/datos-afectacion',controller.addAfectacion);
router.post('/datos-afectacion2',controller.addAfectacion2);
router.post('/datos-desincorporacion',controller.registroDesincorporacion);
router.post('/datos-incorporacion/:idFolio',controller.registroIncorporacion);
router.post('/update-desincorporacion',controller.updateDesincorporacion);
router.post('/datos-motivo',controllers.addMotivo);
router.post('/datos-informante',controllers.addInformante);


// GET
router.get('/folios-abiertos',controller.getFoliosAbiertos);
//router.get('/one-desincorporacion/:idDesincorporacion',controller.getOneDesincorporacion);
router.get('/cumplimientos-list',controller.getCumplimiento_incumplimientos);
router.get('/afectaciones-list',controller.getAfectaciones);
router.get('/one-cumplimiento',controller.getOneCumplimiento_incumplimiento);
router.get('/one-afectacion',controller.getOneAfectacion);
router.get('/registros-list/:tipoDesinc',controllers.getIncumplimientos);
router.get('/kilometrajes-fecha/:tipoDesinc',controllers.getKilometrajeByFecha);
router.get('/motivos-list',controllers.getMotivo);
router.get('/informante-list',controllers.getInformante);

// DELETE
router.delete('/delete-cumplimiento/:idCumIncum',controller.deleteCumplimiento_incumplimiento);
router.delete('/delete-afectacion/:idAfectacion',controller.deleteAfectacion);

module.exports = router;