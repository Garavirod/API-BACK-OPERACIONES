const sequelize = require('sequelize');
const db = require('../../config/db');

const Rutas_Estaciones = db.define('Rutas_Estaciones',{
    /*
        idEstacion(FK) goes in Estaciones
        idRuta(FK) goes in Rutas
    */
});

module.exports = Rutas_Estaciones;