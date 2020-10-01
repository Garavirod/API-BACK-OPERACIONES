const sequelize = require('sequelize');
const db = require('../../config/db');
const Cumplimientos_Incumplimientos = require('../../models/Desincorporaciones/Cumplimientos_Incumplimientos');

const Desincorporacion = db.define("Desincorporacion", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },    
    fecha :{
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    },
    hora :{
        type:sequelize.TIME,
    },
    linea: {
        type: sequelize.INTEGER
    },
    estacion: {
        type: sequelize.STRING
    },
    solicita: {
        type: sequelize.STRING
    },
    informa: {
        type: sequelize.STRING
    },
    empresa: {
        type: sequelize.STRING
    },
    economico: {
        type: sequelize.STRING
    },
    motivo: {
        type: sequelize.STRING
    },
    odometro: {
        type: sequelize.STRING
    },
    creedencial: {
        type: sequelize.STRING
    },
    operador: {
        type: sequelize.STRING
    },
    jornada: {
        type: sequelize.INTEGER
    },
    observaciones: {
        type: sequelize.STRING
    },
    tipoDesincorporacion: {
        type: sequelize.STRING
    },
    estadoFolio: {
        type: sequelize.STRING
    }
    
});

// Relationtionships

Desincorporacion.hasMany(
    Cumplimientos_Incumplimientos,
    {        
        foreignKey : 'idDesincorporacion',
        onUpdate:'cascade',
    }
);

Desincorporacion.hasOne(
    Incorporacion,
    {        
        foreignKey : 'idDesincorporacion',
        onUpdate:'cascade',
    }
);

module.exports = Desincorporacion;