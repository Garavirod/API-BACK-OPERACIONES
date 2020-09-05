const sequelize = require('sequelize');
const db = require('../../config/db');

const Colision = db.define('Colision',{
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sentido: {
        type: sequelize.STRING
    },

    motivo: {
        type: sequelize.STRING
    },

    interseccion: {
        type: sequelize.STRING
    },

    colonia: {
        type: sequelize.STRING
    },
    fecha :{
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    },
    hora :{
        type:sequelize.TIME,
        //defaultValue: sequelize.NOW
    },
});

module.exports = Colision;