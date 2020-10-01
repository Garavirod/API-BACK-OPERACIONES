const db = require('../config/db');
const Cumplimiento_incumplimiento = require('../models/Desincorporaciones/Cumplimientos_Incumplimientos');
const Afectacion = require('../models/Desincorporaciones/Afectaciones');
const controllers = {};
//Borra los datos y tablas al correr el server siempre y caundo sync este en true
db.sync({force:false});

// POST
controllers.addCumplimiento_incumplimiento = async(req,res)=>{
    const _cumpIncum = {
        idDesincorporacion: req.body.idDesincorporacion, //FK
        referencia: req.body.referencia,
        ida: req.body.ida,
        vuelta: req.body.vuelta,
        numVueltas:req.body.numVueltas,
        numIdas: req.body.numIdas,
        numRegresos:req.body.numRegresos,
        tramoDesde: req.body.tramoDesde,
        tramoHasta: req.body.tramoHasta,
        kilometraje: req.body.kilometraje,
        tipo: req.body.tipo
    };//_cumpIncum

    Cumplimiento_incumplimiento.create(_cumpIncum)
    .then(col=>{
        res.json({ success: true, data: col });
    })
    .catch(err=>{
        console.log("ERROR >:", err);
            res.json({ success: false, message: err });
    });//create

}; //addCumpl

controllers.addAfectacion = async(req,res)=>{
    const _afectacion = {
        kilometraje: req.body.kilometraje,
        //fk
        fkIncumplimiento: req.body.fkIncumplimiento,
        fkCumplimiento: req.body.fkCumplimiento,
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

// GET
controllers.getCumplimiento_incumplimiento = async (req,res)=>{
    await Cumplimiento_incumplimiento.findAll()
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}//getCumpl


controllers.getAfectacion = async (req,res)=>{
    await Afectacion.findAll()
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}//getAfectacion

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

module.exports = controllers;