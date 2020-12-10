const sequelize = require('sequelize');
const db = require('../../config/db');

const Acumulados_Distancias = db.define('Acumulados_Distancias',{
    /* 
        idAcum (Fk) goes in Acumulados
        idDistancias(Fk) goes in Distancias
    */
});

module.exports = Acumulados_Distancias;