const sequelize = require('sequelize');
const db = require('../config/db');
const Afectado = require('../models/Afectado');
const { HasOne } = require('sequelize');

const TrasladoHospital = db.define("TrasladoHospital", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreHospital: {
        type: sequelize.STRING
    },
    paseMedico: {
        type: sequelize.STRING
    },
    created :{
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    }
});

//sTrasladoHospital.HasOne(Afectado)
module.exports = TrasladoHospital;