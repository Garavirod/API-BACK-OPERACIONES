const sequelize = require('sequelize');
const db = require('../../config/db');
const Afectacion = require('./Afectacion');

const Cumplimiento_Incumplimiento = db.define('Cumplimiento_Incumplimiento', {
    id:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //idDesincorporacion: FK goes in Desincorporacion
    ruta_referencia:{
        type: sequelize.STRING,
    },
    ref_ida:{
        type: sequelize.STRING,
    },
    num_vuelta:{
        type: sequelize.INTEGER,
    },
    num_ida:{
        type: sequelize.INTEGER,
    },
    num_regreso:{
        type: sequelize.INTEGER,
    },
    tramo_desde:{
        type: sequelize.STRING,
    },
    tramo_hasta:{
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