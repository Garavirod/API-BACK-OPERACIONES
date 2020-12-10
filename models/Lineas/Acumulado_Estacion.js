const sequelize = require('sequelize');
const db = require('../../config/db');

const Acumulado_Estacion = db.define('Acumulados',{
    /*
        idAcum(FK) goes in Acumulados
        idEstacion(FK) goes in Estaciones
    */
});

module.exports = Acumulado_Estacion;