const sequelize = require('sequelize');
const db = require('../../config/db');


const Informantes = db.define('Informantes',{
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreInformante: {
        type: sequelize.STRING
    },

    
});

module.exports = Informantes;