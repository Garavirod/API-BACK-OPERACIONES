const sequelize = require('sequelize');
const db = require('../../config/db');

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
    hra_retrazo :{
        type: sequelize.INTEGER,
    },
    min_retrazo: {
        type: sequelize.INTEGER,
    },
    seg_retrazo: {
        type: sequelize.INTEGER,
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
    credencial: {
        type: sequelize.STRING
    },
    nombre: {
        type: sequelize.STRING
    }
    
});



module.exports = Incorporacion;