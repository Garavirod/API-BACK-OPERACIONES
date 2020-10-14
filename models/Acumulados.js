const sequelize = require('sequelize');
const db = require('../../config/db');
const Acumulados_Distancia = require('./Acumulados_Distancias');
const Acumulado_Estacion = require('./Acumulado_Estacion');

const Acumulados = db.define('Acumulados',{
    idAcum:{
        type: sequelize.INTEGER,
        primaryKey: true
    },
    acumulado:{
        type: sequelize.DOUBLE
    },
    tipo:{
        type: sequelize.STRING
    }
});

Acumulados.hasMany(Acumulados_Distancia, {
    foreignKey: 'idAcum',
    onDelete:'cascade',
    onUpdate:'cascade'
  });
Acumulados_Distancia.belongsTo(Acumulados);

Acumulados.hasMany(Acumulado_Estacion, {
    foreignKey: 'idAcum',
    onDelete:'cascade',
    onUpdate:'cascade'
  });
  Acumulado_Estacion.belongsTo(Acumulados);

module.exports = Acumulados;