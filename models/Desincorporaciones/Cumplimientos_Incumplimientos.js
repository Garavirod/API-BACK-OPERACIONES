const sequelize = require('sequelize');
const db = require('../../config/db');
const Afectaciones = require('./Afectaciones');

const Cumplimientos_Incumplimientos = db.define('Cumplimientos_Incumplimientos', {
    idIncum:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //fkDesincorporacion: FK goes in Desincorporacion
    referencia:{
        type: sequelize.INTEGER,
    },
    ida:{
        type: sequelize.STRING,
    },
    vuelta:{
        type: sequelize.STRING,
    },
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

Cumplimientos_Incumplimientos.hasMany(
    Afectaciones,
    {        
        foreignKey : 'fkIncumplimiento',
        onUpdate:'cascade',
    }
);

Cumplimientos_Incumplimientos.hasMany(
    Afectaciones,
    {        
        foreignKey : 'fkCumplimiento',
        onUpdate:'cascade',
    }
);

module.exports = Cumplimientos_Incumplimientos;