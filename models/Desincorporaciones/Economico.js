const sequelize = require('sequelize');
const db = require('../../config/db');

const Economico = db.define("Economico", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },    
    nombreEconomico: {
        type: sequelize.STRING
    },
    tipoAutobus: {
        type: sequelize.STRING
    },
});
module.exports = Economico;