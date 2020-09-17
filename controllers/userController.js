const User = require("../models/user");
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const controllers = {};
process.env.SECRET_KEY = "secret";
db.sync(); // Migrate tables if do not exist

// REGISTER
controllers.register = async(req, res) => {
    const userData = {
        User_ID: req.body.email,
        Nombre: req.body.nombre,
        Apellido: req.body.lastname,
        Pwd: req.body.password,
        Role: req.body.role 
    };

    User.findOne({
            where: { User_ID: userData.User_ID },
        })
        .then((user) => {
            if (!user) {
                const hash = bcrypt.hashSync(userData.Pwd, 10);
                userData.Pwd = hash;
                User.create(userData)
                    .then((user) => {
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440,
                        });
                        res.json({ success: true, token: token });
                    })
                    .catch((err) => {
                        res.send("Error >:" + err);
                    });
            } else {
                res.json({ error: "User already exist!" });
            }
        })
        .catch((err) => {
            res.send("Error >:" + err);
        });
};

// LOGIN
controllers.login = async(req, res) => {
    User.findOne({ where: { User_ID: req.body.email } })
        .then(user => {
            if (bcrypt.compareSync(req.body.password, user.Pwd)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440,
                });
                res.json({ success: true, token: token, data: user });
            } else {
                res.json({ success: false, message: "user not exist" });
            }
        })
        .catch((err) => {
            res.send("Error >: " + err);
        });
};

// PROFILE
controllers.profile = async(req, res) => {
    var decoded = jwt.verify(req.headers['Authorization'], process.env.SECRET_KEY);
    let issuccefully;
    const profile = await User.findOne({
            where: { id: decoded.id }
        })
        .then(userProfile => {
            if (userProfile) {
                // res.json(userProfile);
                issuccefully = true;
                return userProfile;
            } else {
                issuccefully = false;
                res.send("User does not exist!");
            }
        })
        .catch(err => {
            res.send("Error >: " + err)
        });

    res.json({ success: issuccefully, data: profile });
};


// USERS LIST
controllers.list = async(_, res) => {
    const users = await User.findAll()
        .then(users => {
            if (users) {
                return users;
            } else {
                res.send("There are not users!");
            }
        })
        .catch(err => {
            res.send("Error >: " + err);
        });
    res.json({ success: true, data: users });
};


// USER BY ID
controllers.oneUser = async(req, res) => {
    const userbyid = await User.findOne({
            where: { User_ID: req.params.id }
        })
        .then(user => {
            return user;
        })
        .catch(err => {
            res.send("Error >: " + err);
        });
    res.json({ success: true, data: userbyid });
};

module.exports = controllers;