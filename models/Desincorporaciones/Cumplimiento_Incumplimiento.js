const sequelize = require('sequelize');
const db = require('../../config/db');
const Afectacion = require('./Afectacion');

const Cumplimiento_Incumplimiento = db.define('Cumplimiento_Incumplimiento', {
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
Cumplimiento_Incumplimiento.hasMany(Afectacion, {
    foreignKey: 'reg_cum_inc',
    onDelete:'cascade',
    onUpdate:'cascade'
  });
Afectacion.belongsTo(Cumplimiento_Incumplimiento, {
    foreignKey: 'reg_cum_inc',
    onDelete:'cascade',
    onUpdate:'cascade'
  });


module.exports = Cumplimiento_Incumplimiento;