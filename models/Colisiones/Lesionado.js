const sequelize = require('sequelize');
const db = require('../../config/db');


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


module.exports = Lesionado;