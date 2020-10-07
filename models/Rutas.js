const sequelize = require('sequelize');
const db = require('../../config/db');
const Distancias = require('./Distancias');

const Rutas = db.define('Rutas',{
    idRuta:{
        type: sequelize.STRING,
        primaryKey: true
    },
    //idLinea FK goes in Lineas
    nombreRuta:{
        type: sequelize.STRING
    },
    destinos:{
        type: sequelize.STRING
    }
});

// Relationtionships
Rutas.hasMany(Distancias, {
    foreignKey: 'idRuta',
    onDelete:'cascade',
    onUpdate:'cascade'
  });
Distancias.belongsTo(Rutas);

/*

Rutas.hasMany(Rutas_Estaciones, {
    foreignKey: 'idRuta',
    onDelete:'cascade',
    onUpdate:'cascade'
  });
Rutas_Estaciones.belongsTo(Rutas);
*/

module.exports = Rutas;