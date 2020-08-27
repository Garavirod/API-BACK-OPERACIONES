const Afectado = require('../models/Afectado');
const TrasladoHospital = require('../models/TrasladoHospital');
const DatosSeguro = require('../models/DatosSeguro');
const DatosAmbulancia = require('../models/DatosAmbulancia');
const Evento = require('../models/Evento');
const db = require('../config/db');
const controllers = {}


db.sync();

/**
 * POST
 */

controllers.registroAfectado = async (req, res) => {
    const afectado = {
        sexo: req.body.sexo,
        edad: req.body.edad,
        nombre: req.body.nombre,
        status: req.body.status,
    };

    Afectado.create(afectado)
        .then(afe => {
            res.json({ success: true, data: afe });
        })
        .catch(err => {
            console.log("ERROR >:", err);
            res.json({ success: false, message: err });
        })
};


controllers.registroTrasladoHospital = async (req, res) => {
    const TrasladoHospital = {
        idAfectado: req.body.idAfectado,
        nombreHospital: req.body.nombreHospital,
        paseMedico: req.body.paseMedico,
    };

    TrasladoHospital.create(TrasladoHospital)
        .then(TrasladoH => {
            res.json({ success: true, data: TrasladoH });
        })
        .catch(err => {
            console.log("ERROR >:", err);
            res.json({ success: false, message: err });
        })
};

controllers.registroDatosSeguro = async (req, res) => {
    const DatosSeguro = {
        horaArribo: req.body.horaArribo,
        tiempoRespuesta: req.body.tiempoRespuesta,
        seguro: req.body.seguro,
        corresponde: req.body.corresponde,
        nombreAjustador: req.body.nombreAjustador,
        unidadSeguro: req.body.unidadSeguro,

    };

    DatosSeguro.create(DatosSeguro)
        .then(DatosSegur => {
            res.json({ success: true, data: DatosSegur });
        })
        .catch(err => {
            console.log("ERROR >:", err);
            res.json({ success: false, message: err });
        })
};

controllers.registroEvento = async (req, res) => {
    const Evento = {
        fecha: req.body.fecha,
        hora: req.body.hora,
        tipo_incidente: req.body.tipo_incidente,
        descripción: req.body.descripción,
        tramo: req.body.tramo,
        idOperador: req.body.idOperador,
        folioBitacora: req.body.folioBitacora,

    };

    Evento.create(Evento)
        .then(Event => {
            res.json({ success: true, data: Event });
        })
        .catch(err => {
            console.log("ERROR >:", err);
            res.json({ success: false, message: err });
        })
};

controllers.registroDatosAmbulancia = async (req, res) => {
    const DatosAmbulancia = {
        tiempoLlegada: req.body.tiempoLlegada,
        tiempoRespuesta: req.body.tiempoRespuesta,
        ambulancia: req.body.ambulancia,
        ecoPlaca: req.body.ecoPlaca,
        paramedico: req.body.paramedico,
        diagnostico: req.body.diagnostico,

    };

    DatosAmbulancia.create(DatosAmbulancia)
        .then(DatosAmbulanci => {
            res.json({ success: true, data: DatosAmbulanci });
        })
        .catch(err => {
            console.log("ERROR >:", err);
            res.json({ success: false, message: err });
        })
};

/**
 * GET
 */

 controllers.getEventos = async (req,res)=>{
     Evento.findAll()
     .then(eve=>{
         res.json({success:true, data:eve});
     })
     .catch(err=>{
         res.json({success:false, message:err});
     })
 }


module.exports = controllers;