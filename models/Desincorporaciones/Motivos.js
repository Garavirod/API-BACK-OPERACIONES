const sequelize = require('sequelize');
const db = require('../../config/db');


const Motivos = db.define('Motivos',{
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    motivo: {
        type: sequelize.STRING
    },

    
});

module.exports = Motivos;