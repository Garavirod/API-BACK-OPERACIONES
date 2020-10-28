const sequelize = require('sequelize');
const db = require('../../config/db');

const Afectacion = db.define('Afectacion',{
    id:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    kilometraje:{
        type: sequelize.DOUBLE
    }
    //reg_cum_inc goes in Cumplimientos_incumoplimientos
});

module.exports = Afectacion;

