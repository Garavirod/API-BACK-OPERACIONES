const express = require('express');
const router = express.Router();

const controller = require('../controllers/desincorporacionController');

// POST
router.post('/datos-cumplimiento/:idDesincorporacion',controller.addCumplimiento_incumplimiento);
router.post('/datos-afectacion/:fkCumplimiento',controller.addAfectacion);

// GET
router.get('/cumplimientos-list',controller.getCumplimiento_incumplimientos);
router.get('/afectaciones-list',controller.getAfectaciones);

// DELETE
router.delete('/delete-cumplimiento/:idCumIncum',controller.deleteCumplimiento_incumplimiento);
router.delete('/delete-afectacion/:idAfectacion',controller.deleteAfectacion);

module.exports = router;