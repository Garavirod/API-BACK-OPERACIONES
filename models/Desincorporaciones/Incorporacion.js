const sequelize = require('sequelize');
const db = require('../../config/db');
const Desincorporacion = require('./Desincorporacion');


const Incorporacion = db.define("Incorporacion", {
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
    sentido: {
        type: sequelize.STRING
    },
    status: {
        type: sequelize.STRING
    },
    entrada: {
        type: sequelize.STRING
    },
    retrazo :{
        type:sequelize.TIME,
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
    odometro: {
        type: sequelize.STRING
    },
    creedencial: {
        type: sequelize.STRING
    },
    operador: {
        type: sequelize.STRING
    },
    observaciones: {
        type: sequelize.STRING
    }
    
});

Desincorporacion.hasOne(
    Incorporacion,{        
        foreignKey : 'fk_desincorporacion',
        onDelete:'cascade', 
        onUpdate:'cascade',
    }
);

module.exports = Incorporacion;