const sequelize = require('sequelize');
const db = require('../../config/db');
const Afectaciones = require('./Afectaciones');

const Cumplimientos_Incumplimientos = db.define('Cumplimientos_Incumplimientos', {
    idIncum:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //idDesincorporacion: FK goes in Desincorporacion
    referencia:{
        type: sequelize.STRING,
    },
    ida:{
        type: sequelize.STRING,
    },
    /*se quitó
    vuelta:{
        type: sequelize.STRING,
    },*/
    numVueltas:{
        type: sequelize.INTEGER,
    },
    numIdas:{
        type: sequelize.INTEGER,
    },
    numRegresos:{
        type: sequelize.INTEGER,
    },
    tramoDesde:{
        type: sequelize.STRING,
    },
    tramoHasta:{
        type: sequelize.STRING,
    },
    kilometraje:{
        type: sequelize.DOUBLE,
    },
    tipo:{
        type: sequelize.STRING,
    }
});


// Relationtionships
Cumplimientos_Incumplimientos.hasMany(Afectaciones, {
    foreignKey: 'reg_cum_inc',
    onDelete:'cascade',
    onUpdate:'cascade'
  });
Afectaciones.belongsTo(Cumplimientos_Incumplimientos, {
    foreignKey: 'reg_cum_inc',
    onDelete:'cascade',
    onUpdate:'cascade'
  });


module.exports = Cumplimientos_Incumplimientos;