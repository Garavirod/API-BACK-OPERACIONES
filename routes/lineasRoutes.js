const express = require('express');
const router = express.Router();

const controllers = require('../controllers/lineasControllers');

//POST
router.post("/registro-acumuladoEstacion",controllers.addAcumulado_Estacion);
router.post("/registro-acumuladoDistancia",controllers.addAcumulado_Distancia);
router.post("/registro-acumulado",controllers.addAcumulado);
router.post("/registro-distancia",controllers.addDistancia);
router.post("/registro-rutaEstaciones",controllers.addRutaEstaciones);
router.post("/registro-ruta",controllers.addRuta);
//GET
router.get("/acumuladoEstaciones", controllers.getAcumulado_Estaciones);
router.get("/acumuladoDistancias", controllers.getAcumulado_Distancias);
router.get("/acumulados", controllers.getAcumulados);
router.get("/distancias", controllers.getDistancias);
router.get("/rutasEstaciones", controllers.getRutasEstaciones);
router.get("/rutas", controllers.getRutas);

//DELETE
router.delete("/borra-acumuladoEstacion/:idEvento",controllers.deleteAcumulado_Estacion);
router.delete("/borra-acumuladoDistancia/:idEvento",controllers.deleteAcumulado_Distancia);
router.delete("/borra-acumulado/:idEvento",controllers.deleteAcumulado);
router.delete("/borra-distancia/:idEvento",controllers.deleteDistancia);
router.delete("/borra-rutaEstacion/:idEvento",controllers.deleteRutaEstacion);
router.delete("/borra-ruta/:idEvento",controllers.deleteRuta);

module.exports = router;