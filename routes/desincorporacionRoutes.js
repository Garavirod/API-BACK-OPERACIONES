const express = require('express');
const router = express.Router();

const controller = require('../controllers/desincorporacionController');
const controllers = require('../controllers/desincorporacionController');

// POST
router.post('/datos-afectacion',controller.addAfectacion);
router.post('/datos-afectacion2',controller.addAfectacion2);
router.post('/datos-desincorporacion',controller.registroDesincorporacion);
router.post('/datos-incorporacion/:idFolio',controller.registroIncorporacion);
router.post('/datos-motivo',controllers.addMotivo);
router.post('/datos-informante',controllers.addInformante);
router.post('/update-folio-cumpinc/:idFolio',controllers.updateFolioIncumOrApoyo);
router.post('/update-desincorporacion',controller.updateDesincorporacion);


// GET
router.get('/folios-abiertos',controller.getFoliosAbiertos);
router.get('/cumplimientos-list',controller.getCumplimiento_incumplimientos);
router.get('/afectaciones-list',controller.getAfectaciones);
router.get('/cumplimiento-incumplimiento-folio/:idFolio',controller.getCumIncumsDeFolio);
router.get('/one-afectacion',controller.getOneAfectacion);
router.get('/registros-desinc-list/:tipoDesinc',controllers.getFoliosDataBrief);
router.get('/kilometrajes-fecha/:tipoDesinc',controllers.getKilometrajeByFecha);
router.get('/motivos-list',controllers.getMotivo);
router.get('/informante-list',controllers.getInformante);
router.get('/getfolio/:idFolio',controllers.getFoliosById);

// DELETE
router.delete('/delete-cumplimiento/:idCumIncum',controller.deleteCumplimiento_incumplimiento);
router.delete('/delete-afectacion/:idAfectacion',controller.deleteAfectacion);
router.delete('/delete-folio/:idFolio',controllers.deleteFolio);

module.exports = router;