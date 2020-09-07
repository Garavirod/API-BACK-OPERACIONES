const Afectado = require('../models/Lesionados/Afectado');
const TrasladoHospital = require('../models/Lesionados/TrasladoHospital');
const DatosSeguro = require('../models/Lesionados/DatosSeguro');
const DatosAmbulancia = require('../models/Lesionados/DatosAmbulancia');
const Evento = require('../models/Lesionados/Evento');
const db = require('../config/db');
const controllers = {};

//Borra los datos y tablas al correr el server siempre y caundo sync este en true
db.sync({force:false});

/**
 * POST
 */

controllers.registroAfectado = async (req, res) => {
    const _idEvento = req.params.idEvento;
    const afectado = {
        sexo: req.body.sexo,
        edad: req.body.edad,
        nombre: req.body.nombre,
        status: req.body.status,
        fk_evento:_idEvento,
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
    const trasladoHospital = {        
        nombreHospital: req.body.nombreHospital,
        paseMedico: req.body.paseMedico,
        fk_afectado : req.params.idAfectado
    };

    TrasladoHospital.create(trasladoHospital)
        .then(TrasladoH => {
            res.json({ success: true, data: TrasladoH });
        })
        .catch(err => {
            console.log("ERROR >:", err);
            res.json({ success: false, message: err });
        })
};
// N-M
controllers.registroDatosSeguro = async (req, res) => {
    const evento = await Evento.findOne({where:{id:req.params.idEvento}});    
    const datosSeguro = {
        horaArribo: req.body.horaArribo,
        tiempoRespuesta: req.body.tiempoRespuesta,
        seguro: req.body.seguro,
        corresponde: req.body.corresponde,
        nombreAjustador: req.body.nombreAjustador,
        unidadSeguro: req.body.unidadSeguro,
    };

    DatosSeguro.create(datosSeguro)
        .then(DatosSegur => {
            DatosSegur.addEventos(evento);
            res.json({ success: true, data: DatosSegur });
        })
        .catch(err => {
            console.log("ERROR >:", err);
            res.json({ success: false, message: err });
        })
};

controllers.registroEvento = async (req, res) => {
    const evento = {
        fecha: req.body.fecha,
        hora: req.body.hora,
        tipo_incidente: req.body.tipo_incidente,
        incidente: req.body.incidente,
        descripcion: req.body.descripcion,
        tramo: req.body.tramo,
        operador: req.body.operador,
        bitacora: req.body.bitacora,

    };

    Evento.create(evento)
        .then(Event => {
            res.json({ success: true, data: Event });
        })
        .catch(err => {
            console.log("ERROR >:", err);
            res.json({ success: false, message: err });
        })
};
//N-M
controllers.registroDatosAmbulancia = async (req, res) => {
    const evento = await Evento.findOne({where:{id:req.params.idEvento}});
    const datosAmbulancia = {
        tiempoLLegada: req.body.tiempoLLegada,
        tiempoRespuesta: req.body.tiempoRespuesta,
        ambulancia: req.body.ambulancia,
        ecoPlaca: req.body.ecoPlaca,
        paramedico: req.body.paramedico,
        diagnostico: req.body.diagnostico,
        fk_afectado: req.body.idAfectado,
    };

    DatosAmbulancia.create(datosAmbulancia)
        .then(DatosAmbulanci => {
            DatosAmbulanci.addEventos(evento);
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


 controllers.getAfectados = async (req,res)=>{
     
     await Afectado.findAll({where:{
        fk_evento: req.params.idEvento
     }})
     .then(afe=>{
         res.json({success:true, data:afe});
     })
     .catch(err=>{
         res.json({success:false, message:err});
     })
 }


 controllers.getTraslados = async (req,res)=>{    
    await TrasladoHospital.findAll({
        include:[
            {
                model:Afectado,
                where: {
                    fk_evento:req.params.idEvento
                },
                attributes:["id"],                
            }
        ]           
    })
    .then(seg=>{
        res.json({success:true, data:seg});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })   
}

controllers.getDatosSeguro = async (req,res)=>{
    await DatosSeguro.findAll({
        include:[ 
            {   model:Evento, 
                where:
                {
                    id:req.params.idEvento
                },
                attributes:["id"]
            }           
        ],            
    })
    .then(seg=>{
        res.json({success:true, data:seg});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}

controllers.getDatosAmbulancia = async (req,res)=>{
    await DatosAmbulancia.findAll({
        include:[ 
            {   model:Evento, 
                where:
                {
                    id:req.params.idEvento
                },
                attributes:["id"]
            }           
        ],            
    })
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}

controllers.getEventos = async (req,res)=>{
    await Evento.findAll()
    .then(eve=>{
        res.json({success:true, data:eve});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}

controllers.borraEvento = async (req,res)=>{
    const id_event = req.params.idEvento;
    await Evento.destroy({ 
        where : {
            id: id_event
        }
    })
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}

controllers.borraAfectado = async (req,res)=>{
    const id_afectado = req.params.idAfectado;
    await Afectado.destroy({ 
        where : {
            id: id_afectado
        }
    })
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}

controllers.borraTraslado = async (req,res)=>{
    const id_traslado = req.params.idTraslado;
    await TrasladoHospital.destroy({ 
        where : {
            id: id_traslado
        }
    })
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}

controllers.borraSeguro = async (req,res)=>{
    const id_seguro = req.params.idSeguro;
    await DatosSeguro.destroy({ 
        where : {
            id: id_seguro
        }
    })
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}

controllers.borraAmbulancia = async (req,res)=>{
    const id_ambulancia = req.params.idAmbulancia;
    await DatosAmbulancia.destroy({ 
        where : {
            id: id_ambulancia
        }
    })
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}






module.exports = controllers;