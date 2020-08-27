const sequelize = require('sequelize');
const db = require('../config/db');
const Afectado = require('./Afectado');
const Evento = require('./Evento');

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

// 1 - 1
DatosAmbulancia.belongsTo(
    Afectado,
    {
        as :"afectado",
        foreignKey : 'fk_afectado',
        onDelete:'cascade', 
        onUpdate:'cascade',
    }
);

// N - M 

DatosAmbulancia.belongsToMany(
    Evento,
    {
        through : 'Evento_Ambulancia',
        onDelete:'cascade', 
        onUpdate:'cascade',
    }
);

module.exports = DatosAmbulancia;