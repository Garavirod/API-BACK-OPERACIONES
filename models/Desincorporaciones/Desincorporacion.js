const sequelize = require('sequelize');
const db = require('../../config/db');
const Cumplimiento_Incumplimiento = require('./Cumplimiento_Incumplimiento');
const Incorporacion = require("../../models/Desincorporaciones/Incorporacion");

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
        type: sequelize.STRING
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
    credencial: {
        type: sequelize.STRING
    },
    nombre: {
        type: sequelize.STRING
    },
    jornada: {
        type: sequelize.INTEGER
    },
    observaciones: {
        type: sequelize.STRING
    },
    tipo: {
        type: sequelize.STRING
    },
    edoFolio: {
        type: sequelize.STRING
    }
    
});

// Relationtionships
Desincorporacion.hasMany(Cumplimiento_Incumplimiento, {
    foreignKey : 'idDesincorporacion',
    onDelete:'cascade',
    onUpdate:'cascade'
});
Cumplimiento_Incumplimiento.belongsTo(Desincorporacion, {
    foreignKey : 'idDesincorporacion',
    onDelete:'cascade',
    onUpdate:'cascade'
});

Desincorporacion.hasOne(Incorporacion, {
    foreignKey : 'idDesincorporacion',
    onDelete:'cascade',
    onUpdate:'cascade'
});
Incorporacion.belongsTo(Desincorporacion, {
    foreignKey : 'idDesincorporacion',
    onDelete:'cascade',
    onUpdate:'cascade'
});

module.exports = Desincorporacion;