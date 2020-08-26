const Afectado = require('../models/Afectado');
const TrasladoHospital = require('../models/TrasladoHospital');
const DatosSeguro = require('../models/DatosSeguro');
const Evento = require('../models/Evento');
const DatosAmbulancia = require('../models/DatosAmbulancia');
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


controllers.registroTrasladoHospital = async(req,res) =>{
    const trasladoHospital = {
        idAfectado : req.body.idAfectado,
        nombreHospital : req.body.nombreHospital,
        paseMedico : req.body.paseMedico,
    };

    TrasladoHospital.create(trasladoHospital)
    .then(TrasladoH=>{
        res.json({success:true, data: TrasladoH});
    })
    .catch(err =>{
        console.log("ERROR >:",err);
        res.json({success:false, message: err});
    })
};

controllers.registroDatosSeguro = async(req,res) =>{
    const datosSeguro = {
        horaArribo : req.body.horaArribo,
        tiempoRespuesta : req.body.tiempoRespuesta,
        seguro : req.body.seguro,
        corresponde : req.body.corresponde,
        nombreAjustador : req.body.nombreAjustador,
        unidadSeguro : req.body.unidadSeguro,
        
    };

    DatosSeguro.create(datosSeguro)
    .then(DatosSegur=>{
        res.json({success:true, data: DatosSegur});
    })
    .catch(err =>{
        console.log("ERROR >:",err);
        res.json({success:false, message: err});
    })
};

controllers.registroEvento = async(req,res) =>{
    const evento = {
        fecha : req.body.fecha,
        hora : req.body.hora,
        incidente : req.body.incidente,
        tipo_incidente : req.body.tipo_incidente,
        descripción : req.body.descripción,
        tramo : req.body.tramo,
        idOperador : req.body.idOperador,
        folioBitacora : req.body.folioBitacora,
        
    };

    Evento.create(evento)
    .then(Event=>{
        res.json({success:true, data: Event});
    })
    .catch(err =>{
        console.log("ERROR >:",err);
        res.json({success:false, message: err});
    })
};

controllers.registroDatosAmbulancia = async(req,res) =>{
    const datosAmbulancia = {
        tiempoLlegada : req.body.tiempoLlegada,
        tiempoRespuesta : req.body.tiempoRespuesta,
        ambulancia : req.body.ambulancia,
        ecoPlaca : req.body.ecoPlaca,
        paramedico : req.body.paramedico,
        diagnostico : req.body.diagnostico,
        
    };

    DatosAmbulancia.create(datosAmbulancia)
    .then(DatosAmbulanci=>{
        res.json({success:true, data: DatosAmbulanci});
    })
    .catch(err =>{
        console.log("ERROR >:",err);
        res.json({success:false, message: err});
    })
};


module.exports = controllers;