const db = require('../config/db');
const Desincorporacion = require('../models/Desicorporaciones/Desincorporacion');
const Incoporacion = require('../models/Desicorporaciones/Incorporacion');
const controllers = {};
//Borra los datos y tablas al correr el server siempre y caundo sync este en true
db.sync({force:false});

// POST
controllers.registroDesincoporacion = async (req, res) => {
    const desincorporacion = {
        fecha: req.body.fecha,
        hora: req.body.hora,
        linea: req.body.linea,
        estacion: req.body.estacion,
        solicita: req.body.sentido,
        informa: req.body.informa,
        empresa: req.body.empresa,
        economico: req.body.economico,
        motivo: req.body.motivo,
        odometro: req.body.odometro,
        creedencial: req.body.creedencial,
        operador: req.body.operador,
        jornada: req.body.jornada,
        observaciones: req.body.observaciones,
        tipoDesincorporacion: req.body.tipoDesincorporacion,
        estadoFolio: req.body.estadoFolio,
    };

    Desincoporacion.create(desincorporacion)
        .then(des => {
            res.json({ success: true, data: des });
        })
        .catch(err => {
            console.log("ERROR >:", err);
            res.json({ success: false, message: err });
        })
};

controllers.registroIncoporacion = async (req, res) => {
    const incorporacion = {
        fecha: req.body.fecha,
        hora: req.body.hora,
        linea: req.body.linea,
        estacion: req.body.estacion,
        sentido: req.body.sentido,
        status: req.body.status,
        entrada: req.body.entrada,
        retrazo: req.body.retrazo,
        informa: req.body.informa,
        empresa: req.body.empresa,
        economico: req.body.economico,
        odometro: req.body.odometro,
        creedencial: req.body.creedencial,
        operador: req.body.operador,
        observaciones: req.body.observaciones,
    };

    Incoporacion.create(incorporacion)
        .then(inc => {
            res.json({ success: true, data: inc });
        })
        .catch(err => {
            console.log("ERROR >:", err);
            res.json({ success: false, message: err });
        })
};


// GET

controllers.getDesincoporaciones = async (req,res)=>{
    await Desincorporacion.findAll()
    .then(eve=>{
        res.json({success:true, data:eve});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}

controllers.getIncoporaciones = async (req,res)=>{
    await Incorporacion.findAll()
    .then(eve=>{
        res.json({success:true, data:eve});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}

// DELETE

controllers.borraIncorporacion = async (req,res)=>{
    const id_incorporacion = req.params.idIncorporacion;
    await Incorporacion.destroy({ 
        where : {
            id: id_incorporacion
        }
    })
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}

controllers.borraDesincorporacion = async (req,res)=>{
    const id_desincorporacion = req.params.idDesincorporacion;
    await Incorporacion.destroy({ 
        where : {
            id: id_desincorporacion
        }
    })
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}