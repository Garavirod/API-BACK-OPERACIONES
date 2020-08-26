const sequelize = require('sequelize');
const db = require('../config/db');
const { SqlError } = require('mariadb');

const DatosAmbulancia = db.define("DatosAmbulancia",{
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    tiempoLLegada: {
        type: sequelize.DATE
    },
    tiempoRespuesta: {
        type: sequelize.DATE
    },
    ambulancia: {
        type: sequelize.STRING
    },
    ecoPlaca: {
        type: sequelize.STRING
    },
    paramedico: {
        type: sequelize.STRING
    },
    diagnostico: {
        type: sequelize.STRING
    },
    created :{
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    }
});

module.exports = DatosAmbulancia;