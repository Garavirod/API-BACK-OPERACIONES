const sequelize = require('sequelize');
const db = require('../../config/db');
const Economico = require('../Desincorporaciones/Economico');

const EmpresaOperadora = db.define("EmpresaOperadora", {
    idEmpresa: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },    
    nombreEmpresaOperadora: {
        type: sequelize.STRING
    },
});

//relationships
EmpresaOperadora.hasMany(
    Economico,
    {        
        foreignKey : 'idEmpresa',
        onUpdate:'cascade'
    }
);

module.exports = EmpresaOperadora;