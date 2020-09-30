const sequelize = require('sequelize');
const db = require('../../config/db');

const EmpresaOperadora = db.define("EmpresaOperadora", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },    
    nombreEmpresaOperadora: {
        type: sequelize.STRING
    },
});
module.exports = EmpresaOperadora;