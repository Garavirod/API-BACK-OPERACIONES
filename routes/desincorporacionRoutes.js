const express = require('express');
const router = express.Router();

const controller = require('../controllers/desincorporacionController');

// POST
router.post('/datos-cumplimiento/:idDesincorporacion',controller.addCumplimiento_incumplimiento);
router.post('/datos-afectacion',controller.addAfectacion);
router.post('/datos-afectacion2',controller.addAfectacion2);
router.post('/datos-desincorporacion',controller.registroDesincorporacion);


// GET
router.get('/folios-abiertos',controller.getFoliosAbiertos);
router.get('/one-desincorporacion/:idDesincorporacion',controller.getOneDesincorporacion);
router.get('/cumplimientos-list',controller.getCumplimiento_incumplimientos);
router.get('/afectaciones-list',controller.getAfectaciones);
router.get('/one-cumplimiento',controller.getOneCumplimiento_incumplimiento);
router.get('/one-afectacion',controller.getOneAfectacion);

// DELETE
router.delete('/delete-cumplimiento/:idCumIncum',controller.deleteCumplimiento_incumplimiento);
router.delete('/delete-afectacion/:idAfectacion',controller.deleteAfectacion);

module.exports = router;