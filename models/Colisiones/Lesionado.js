const sequelize = require('sequelize');
const db = require('../../config/db');
const Colision = require('./Colision');


const Lesionado = db.define('Lesionado',{
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sexo: {
        type: sequelize.STRING
    },

    tipo_lesionado: {
        type: sequelize.STRING
    },   
});

Lesionado.belongsTo(
    Colision,
    {
        as : "pertenece",
        foreignKey : 'fk_colision',
        onDelete:'cascade', 
        onUpdate:'cascade',
    }
);

module.exports = Lesionado;