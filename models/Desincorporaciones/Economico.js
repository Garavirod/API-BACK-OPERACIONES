const sequelize = require('sequelize');
const db = require('../../config/db');

const Economico = db.define("Economico", {
<<<<<<< HEAD
    idEconomico: {
=======
    id: {
>>>>>>> f9216509ace742e371197d8cbe155dab11cdeb42
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },    
    nombreEconomico: {
        type: sequelize.STRING
    },
    tipoAutobus: {
        type: sequelize.STRING
    },
});
module.exports = Economico;