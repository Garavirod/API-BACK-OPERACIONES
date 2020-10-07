const sequelize = require('sequelize');
const db = require('../../config/db');

const Distancias = db.define('Distancias',{
    idDistancia:{
        type: sequelize.STRING,
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

/*

Distancias.hasMany(Acumulados_Distancias, {
    foreignKey: 'idDistancia',
    onDelete:'cascade',
    onUpdate:'cascade'
  });
Acumulados_Distancias.belongsTo(Distancias);
*/

module.exports = Distancias;