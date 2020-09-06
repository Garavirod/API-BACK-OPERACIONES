const sequelize = require('sequelize');
const db = require('../../config/db');
const Evento = require('./Evento');

const DatosSeguro = db.define("DatosSeguro",{
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    horaArribo: {
        type: sequelize.TIME
    },
    tiempoRespuesta: {
        type: sequelize.TIME
    },
    seguro: {
        type: sequelize.STRING
    },
    corresponde: {
        type: sequelize.STRING
    },
    nombreAjustador: {
        type: sequelize.STRING
    },
    unidadSeguro: {
        type: sequelize.STRING
    },
    created :{
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    }
});

// N - M 

DatosSeguro.belongsToMany(
    Evento, //addEventos getEventos setEventos..
    {
        through : 'Seguro_Evento',
        onDelete:'cascade', 
        onUpdate:'cascade',
    }
);

Evento.belongsToMany(
    DatosSeguro, //addEventos getEventos setEventos..
    {
        through : 'Seguro_Evento',
        onDelete:'cascade', 
        onUpdate:'cascade',
    }
);


module.exports = DatosSeguro;