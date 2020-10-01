const sequelize = require('sequelize');
const db = require('../../config/db');

const Afectaciones = db.define('Afectaciones',{
    idAfectacion:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    kilometraje:{
        type: sequelize.DOUBLE
    }
    //fkCumplimiento fkIncumplimiento goes in Cumplimientos_incumoplimientos
});

module.exports = Afectaciones;

