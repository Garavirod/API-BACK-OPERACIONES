const sequelize = require('sequelize');
const db = require('../config/db');

const Afectado = db.define("Afectado", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    sexo: {
        type: sequelize.BOOLEAN
    },

    edad: {
        type: sequelize.INTEGER
    },
    nombre: {
        type: sequelize.STRING
    },
    status: {
        type: sequelize.BOOLEAN
    },
    created :{
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    }
});


module.exports = Afectado;