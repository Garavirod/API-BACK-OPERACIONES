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
    //reg_cum_inc goes in Cumplimientos_incumoplimientos
});

module.exports = Afectaciones;

