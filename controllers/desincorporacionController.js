const db = require('../config/db');
const Cumplimiento_incumplimiento = require('../models/Desincorporaciones/Cumplimientos_Incumplimientos');
const Afectacion = require('../models/Desincorporaciones/Afectaciones');
const Desincorporacion = require('../models/Desicorporaciones/Desincorporacion');
const Incoporacion = require('../models/Desicorporaciones/Incorporacion');
const controllers = {};
//Borra los datos y tablas al correr el server siempre y caundo sync este en true
db.sync({force:false});
// POST
controllers.addCumplimiento_incumplimiento = async(req,res)=>{
    const _cumpIncum = {
        idDesincorporacion: req.params.idDesincorporacion, //FK
        referencia: req.body.ruta_referencia,
        ida: req.body.ref_ida,
        /*se quitó
        vuelta: req.body.ref_vuelta,*/
        numVueltas:req.body.num_vuelta,
        numIdas: req.body.num_ida,
        numRegresos:req.body.num_regreso,
        tramoDesde: req.body.tramo_desde,
        tramoHasta: req.body.tramo_hasta,
        kilometraje: req.body.kilometraje,
        tipo: req.body.tipo
    };//_cumpIncum

    Cumplimiento_incumplimiento.create(_cumpIncum)
    .then(col=>{
        console.log("Cumplimiento successfuly added");
        //add afectacion
        const _afectacion = {
            kilometraje: col.dataValues.kilometraje,
            //fk
            reg_cum_inc: col.dataValues.idIncum,
        };//_afectacion
    
        Afectacion.create(_afectacion)
        .then(af=>{
            console.log("Afectacion successfuly added");
        })
        .catch(err=>{
            console.log("ERROR >:", err);
                res.json({ success: false, message: err });
        });//createAfectacion

        res.json({ success: true, data: col });
    })
    .catch(err=>{
        console.log("ERROR >:", err);
            res.json({ success: false, message: err });
    });//create

}; //addCumpl

/* Afectacion is added inmediately after the Cumplimiento_Incumplimiento is added,
since it's idCumplimiento_Incumplimiento is needed for the Afectacion*/
controllers.addAfectacion = async(req,res)=>{
    const _afectacion = {
        kilometraje: req.body.kilometraje,
        //fk
        reg_cum_inc: req.body.idCumplimiento,
    };//_afectacion

    Afectacion.create(_afectacion)
    .then(col=>{
        res.json({ success: true, data: col });
    })
    .catch(err=>{
        console.log("ERROR >:", err);
            res.json({ success: false, message: err });
    });//create
};

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
};//registroDesincoporacion

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
};//registroIncoporacion

// GET
controllers.getCumplimiento_incumplimientos = async (req,res)=>{
    await Cumplimiento_incumplimiento.findAll()
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}//getCumplimiento_incumplimientos

    //getOne
controllers.getOneCumplimiento_incumplimiento = async(req, res) => {
    await Cumplimiento_incumplimiento.findOne({ where: { idIncum: req.body.idIncum } })
        .then(cumplIncum => {
                log("cumplimiento_incumplimiento found");
                res.json({ success: true, data: cumplIncum });
        })
        .catch((err) => {
            res.json({success:false, message:err});
        });
};//getOneCumplimiento_incumplimiento


controllers.getAfectaciones = async (req,res)=>{
    await Afectacion.findAll()
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}//getAfectaciones

    //getOne
controllers.getOneAfectacion = async(req, res) => {
    await Afectacion.findOne({ where: { idAfectacion: req.body.idAfectacion } })
        .then(afec => {
                log("Afectacion found");
                res.json({ success: true, data: afec });
        })
        .catch((err) => {
            res.json({success:false, message:err});
        });
};//getOneAfectacion

controllers.getDesincoporaciones = async (req,res)=>{
    await Desincorporacion.findAll()
    .then(eve=>{
        res.json({success:true, data:eve});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}//getDesincoporaciones

controllers.getIncoporaciones = async (req,res)=>{
    await Incorporacion.findAll()
    .then(eve=>{
        res.json({success:true, data:eve});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}//getIncoporaciones


// DELETE
controllers.deleteCumplimiento_incumplimiento = async (req,res)=>{
    const idCumIncum = req.params.idCumIncum;
    await Cumplimiento_incumplimiento.destroy({ 
        where : {idIncum: idCumIncum}
    })
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
};//deleteCumpl

controllers.deleteAfectacion = async (req,res)=>{
    const idAfectacion = req.params.idAfectacion;
    await Afectacion.destroy({ 
        where : {idAfectacion: idAfectacion}
    })
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
};//deleteAfectacion

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
}//borraIncorporacion

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
}//borraDesincorporacion


module.exports = controllers;
