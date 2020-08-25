const Afectado = require('../models/Afectado');
const db = require('../config/db');
const controllers = {}


db.sync();

controllers.registroAfectado = async(req,res) =>{
    const afectado = {
        sexo : req.body.sexo,
        edad : req.body.edad,
        nombre: req.body.nombre,
        status : req.body.status,
    };

    Afectado.create(afectado)
    .then(afe=>{
        res.json({success:true, data: afe});
    })
    .catch(err =>{
        console.log("ERROR >:",err);
        res.json({success:false, message: err});
    })
};


module.exports = controllers;