const sequelize = require('sequelize');
const db = require('../../config/db');
const Colision = require('./Colision');


const DatosAutomovil = db.define('DatosAutomovil',{
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sexo_contuctor: {
        type: sequelize.STRING
    },

    marca: {
        type: sequelize.STRING
    },

    submarca: {
        type: sequelize.STRING
    },

    color: {
        type: sequelize.STRING
    },

    placa: {
        type: sequelize.STRING
    },
});

module.exports = DatosAutomovil;