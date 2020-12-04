const express = require('express');
const router = express.Router();
// controller
const controllers = require('../controllers/colisionadosController');

// POST
router.post('/datos-automovil/:idColision',controllers.addAutomovil);
router.post('/datos-seguro/:idColision',controllers.addSeguro);
router.post('/datos-lesionado/:idColision',controllers.addLesionado);
router.post('/datos-colision',controllers.addColision);
router.post('/datos-economico/:idColision',controllers.addEconomicoColisionado);
// GET
router.get('/colisiones-list',controllers.getColisiones);
router.get('/automovil-list/:idColision',controllers.getAutomovil);
router.get('/seguro-list/:idColision',controllers.getSeguro);
router.get('/lesionados-list/:idColision',controllers.getLesionados);
router.get('/economico-list/:idColision',controllers.getEconomicos);
router.get('/empresa-tiempo/:empresa/:anio',controllers.getColEmpresaTiempo);
router.get('/empresas-colisionadas',controllers.getEmpresasColisionadas);
router.get('/responsables-list',controllers.getResponsables);
router.get('/colisiones-by-year',controllers.getColisionesByYear);

// DELETE
router.delete('/delete-colision/:idColision',controllers.deleteColision);
router.delete('/delete-lesionada/:idlesionado',controllers.deleteLesionado);
router.delete('/delete-seguro/:idSeguro',controllers.deleteSeguro);
router.delete('/delete-automovil/:idAutomovil',controllers.deleteAutomovil);
router.delete('/delete-economico/:idEconomico',controllers.deleteEconomico);

module.exports= router;
