const Sequelize = require("sequelize");

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize("mbv6", "admin", "password", {//rootmboper
    host: "127.0.0.1",//"mboper.cuknxnysfure.us-east-2.rds.amazonaws.com"
    dialect: "mariadb",
    port: "3306",
    define: {
        timestamps: false,
    },
});

module.exports = sequelize;