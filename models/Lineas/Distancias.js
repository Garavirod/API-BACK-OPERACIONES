const sequelize = require('sequelize');
const db = require('../../config/db');
const Acumulados_Distancias = require('./Acumulados_Distancias');

const Distancias = db.define('Distancias',{
    idDistancia:{
        type: sequelize.INTEGER,
        primaryKey: true
    },
    //idRuta FK goes in Rutas
    destinos:{
        type: sequelize.DOUBLE
    },
    vuelta_comp:{
        type: sequelize.STRING
    }
});

Distancias.hasMany(Acumulados_Distancias, {
    foreignKey: 'idDistancias',
    onDelete:'cascade',
    onUpdate:'cascade'
  });
Acumulados_Distancias.belongsTo(Distancias);

module.exports = Distancias;