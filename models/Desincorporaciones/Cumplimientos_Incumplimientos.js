const sequelize = require('sequelize');
const db = require('../../config/db');
const Afectaciones = require('./Afectaciones');

const Cumplimientos_Incumplimientos = db.define('Cumplimientos_Incumplimientos', {
    id_incum:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //id_desincorporacion: FK goes in Desincorporacion
    referencia:{
        type: sequelize.INTEGER,
    },
    ida:{
        type: sequelize.STRING,
    },
    vuelta:{
        type: sequelize.STRING,
    },
    num_vueltas:{
        type: sequelize.INTEGER,
    },
    num_idas:{
        type: sequelize.INTEGER,
    },
    num_regresos:{
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

Cumplimientos_Incumplimientos.hasMany(
    Afectaciones,
    {        
        foreignKey : 'fk_incumplimiento',
        onUpdate:'cascade',
    }
);

Cumplimientos_Incumplimientos.hasMany(
    Afectaciones,
    {        
        foreignKey : 'fk_cumplimiento',
        onUpdate:'cascade',
    }
);

module.exports = Cumplimientos_Incumplimientos;