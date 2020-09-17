const sequelize = require('sequelize');
const db = require('../config/db');


module.exports =  db.define("persona", {
    User_ID: {
        type: sequelize.STRING,
        primaryKey: true,
    },
    Nombre: {
        type: sequelize.STRING
    },
    Pwd: {
        type: sequelize.STRING
    },
    Role: {
        type: sequelize.STRING
    },
    Apellido: {
        type: sequelize.STRING
    }
},
    {
        freezeTableName: true
});
