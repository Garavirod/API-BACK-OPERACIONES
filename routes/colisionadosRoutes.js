const express = require('express');
const router = express.Router();
// controller
const controllers = require('../controllers/colisionadosController');

// POST
router.post('/datos-automovil/:idColision',controllers.addAutomovil);
router.post('/datos-seguro/:idColision',controllers.addSeguro);
router.post('/datos-lesionado/:idColision',controllers.addLesionado);
router.post('/datos-colision',controllers.addColision);
// GET
router.get('/colisiones-list',controllers.getColisiones);
router.get('/automovil-list/:idColision',controllers.getAutomovil);
router.get('/seguro-list/:idColision',controllers.getSeguro);
router.get('/lesionados-list/:idColision',controllers.getLesionados);
// DELETE
router.delete('/delete-colision/:idColision',controllers.deleteColision);


module.exports= router;
