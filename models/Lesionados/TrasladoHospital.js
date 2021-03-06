const sequelize = require('sequelize');
const db = require('../../config/db');
const Afectado = require('../Lesionados/Afectado');


const TrasladoHospital = db.define("TrasladoHospital", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreHospital: {
        type: sequelize.STRING
    },
    paseMedico: {
        type: sequelize.STRING
    },
    created :{
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    }
});

// 1 - M 
TrasladoHospital.belongsTo(
    Afectado,{        
        foreignKey : 'fk_afectado',
        onDelete:'cascade', 
        onUpdate:'cascade',
    }
);


Afectado.hasOne(
    TrasladoHospital,{        
        foreignKey : 'fk_afectado',
        onDelete:'cascade', 
        onUpdate:'cascade',
    }
);

module.exports = TrasladoHospital;