const sequelize = require('sequelize');
const db = require('../../config/db');
const Lesionado = require('./Lesionado');
const DatosAutomovil = require('./DatosAutomovil');

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

// Relations

Colision.hasMany(
    Lesionado,
    {
        as : "pertenece",
        foreignKey : 'fk_colision',
        onDelete:'cascade', 
        onUpdate:'cascade',
    }
);

Colision.hasMany(
    DatosAutomovil,
    {
        as : "asociado",
        foreignKey : 'fk_colision',
        onDelete:'cascade', 
        onUpdate:'cascade',
    }
);



module.exports = Colision;