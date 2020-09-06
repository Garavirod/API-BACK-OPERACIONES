const sequelize = require('sequelize');
const db = require('../../config/db');
const Colision = require('./Colision');


const DatosSeguroColision = db.define('DatosSeguroColision',{
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_seguro: {
        type: sequelize.STRING
    },

    tipo_seguro: {
        type: sequelize.STRING
    }, 
    
    paga: {
        type: sequelize.STRING
    }, 

    comentarios: {
        type: sequelize.STRING
    }, 
});

// Relations 

DatosSeguroColision.belongsToMany(
    Colision, //addColisions getColisions setColisions..
    {
        through : 'seguro_colision',
        onDelete:'cascade', 
        onUpdate:'cascade',
    }
);


Colision.belongsToMany(
    DatosSeguroColision, //addColisions getColisions setColisions..
    {
        through : 'seguro_colision',
        onDelete:'cascade', 
        onUpdate:'cascade',
    }
);

module.exports = DatosSeguroColision;