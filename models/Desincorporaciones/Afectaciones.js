const sequelize = require('sequelize');
const db = require('../../config/db');

const Afectaciones = db.define('Afectaciones',{
    id_afectacion:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    kilometraje:{
        type: sequelize.DOUBLE
    }
});

module.exports = Afectaciones;

