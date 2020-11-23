const sequelize = require('sequelize');
const db = require('../../config/db');

const EconomicoColisionado = db.define('EconomicoColisionado',{
    id:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    empresa:{
        type: sequelize.STRING
    },
    economico:{
        type: sequelize.STRING
    }
});

module.exports = EconomicoColisionado;