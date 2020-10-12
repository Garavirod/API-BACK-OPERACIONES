const db = require('../config/db');
const Cumplimiento_incumplimiento = require('../models/Desincorporaciones/Cumplimientos_Incumplimientos');
const Afectacion = require('../models/Desincorporaciones/Afectaciones');
const controllers = {};
//Borra los datos y tablas al correr el server siempre y caundo sync este en true
db.sync({force:false});
// POST
controllers.addCumplimiento_incumplimiento = async(req,res)=>{
    const _cumpIncum = {
        idDesincorporacion: req.params.idDesincorporacion, //FK
        referencia: req.body.ruta_referencia,
        ida: req.body.ref_ida,
        vuelta: req.body.ref_vuelta,
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