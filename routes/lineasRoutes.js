const express = require('express');
const router = express.Router();

const controller = require('../controllers/lineasControllers');

// POST
//router.post('/update-folio-cumpinc/:idFolio',controllers.updateFolioIncumOrApoyo);

// GET
//router.get('/cumplimiento-incumplimiento-folio/:idFolio',controller.getCumIncumsDeFolio);
router.get('/all-lineas',controller.getAllLineas);
router.get('/estaciones-linea/:idLinea',controller.getEstacionesByLinea);

// DELETE
//router.delete('/delete-cumplimiento/:idCumIncum',controller.deleteCumplimiento_incumplimiento);


module.exports = router;