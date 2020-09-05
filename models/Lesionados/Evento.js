const sequelize = require('sequelize');
const db = require('../../config/db');
const Afectado = require('../Lesionados/Afectado');

const Evento = db.define("Evento", {
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
        //defaultValue: sequelize.NOW
    },
    tipo_incidente :{
        type: sequelize.BOOLEAN,    
    },
    incidente: {
        type:sequelize.STRING
    },
    descripcion :{
        type:sequelize.STRING
    },
    tramo :{
        type:sequelize.STRING
    },
    operador :{
        type:sequelize.STRING
    },
    bitacora :{
        type:sequelize.STRING
    }

});
// 1 - M
Evento.hasMany(
    Afectado,
    {
        as : "asociado",
        foreignKey : 'fk_evento',
        onDelete:'cascade', 
        onUpdate:'cascade',
    }
);
module.exports = Evento;