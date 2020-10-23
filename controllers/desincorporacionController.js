const db = require('../config/db');
const Cumplimiento_incumplimiento = require('../models/Desincorporaciones/Cumplimiento_Incumplimiento');
const Afectacion = require('../models/Desincorporaciones/Afectacion');
const Desincorporacion = require('../models/Desincorporaciones/Desincorporacion');
const Incoporacion = require('../models/Desincorporaciones/Incorporacion');
const Incorporacion = require('../models/Desincorporaciones/Incorporacion');
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
    const desincorporacion = {  
        fecha: req.body.fecha,
        hora: req.body.hora,
        linea: req.body.linea,
        estacion: req.body.estacion,
        solicita: req.body.solicita,
        informa: req.body.informa,
        empresa: req.body.empresa,
        economico: req.body.economico,
        motivo: req.body.motivo,
        odometro: req.body.odometro,
        creedencial: req.body.credencial,
        operador: req.body.nombre,
        jornada: req.body.jornada,
        observaciones: req.body.observaciones,
        tipoDesincorporacion: req.body.tipo,
        estadoFolio: req.body.edoFolio,
    };

    const _cumpIncum = {
        //idDesincorporacion: req.params.idDesincorporacion,
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
    
    Desincorporacion.create(desincorporacion)
        .then(des => {
            des.createCumplimiento_Incumplimiento(_cumpIncum)
            .then(cum =>{
                const _afectacion = {
                    kilometraje: req.body.kilometraje
                }
                cum.createAfectacion(_afectacion).then(af =>{
                    res.json({ success: true, data: des });
                });
            });
        })
        .catch(err => {
            console.log("ERROR >:", err);
            res.json({ success: false, message: err });
        })

};//addAfectacion

controllers.addAfectacion2 = async(req,res)=>{
    const [desincorporacion, valRef1, valRef2] = req.body;

    const _desincorporacion = {  
        fecha: desincorporacion.fecha,
        hora: desincorporacion.hora,
        linea: desincorporacion.linea,
        estacion: desincorporacion.estacion,
        solicita: desincorporacion.solicita,
        informa: desincorporacion.informa,
        empresa: desincorporacion.empresa,
        economico: desincorporacion.economico,
        motivo: desincorporacion.motivo,
        odometro: desincorporacion.odometro,
        creedencial: desincorporacion.credencial,
        operador: desincorporacion.nombre,
        jornada: desincorporacion.jornada,
        observaciones: desincorporacion.observaciones,
        tipoDesincorporacion: desincorporacion.tipo,
        estadoFolio: desincorporacion.edoFolio,
    };
    const _cumpIncum1 = {
        referencia: valRef1.ruta_referencia,
        ida: valRef1.ref_ida,
        numVueltas:valRef1.num_vuelta,
        numIdas: valRef1.num_ida,
        numRegresos:valRef1.num_regreso,
        tramoDesde: valRef1.tramo_desde,
        tramoHasta: valRef1.tramo_hasta,
        kilometraje: valRef1.kilometraje,
        tipo: valRef1.tipo
    };//_cumpIncum
    const _cumpIncum2 = {
        referencia: valRef2.ruta_referencia,
        ida: valRef2.ref_ida,
        numVueltas:valRef2.num_vuelta,
        numIdas: valRef2.num_ida,
        numRegresos:valRef2.num_regreso,
        tramoDesde: valRef2.tramo_desde,
        tramoHasta: valRef2.tramo_hasta,
        kilometraje: valRef2.kilometraje,
        tipo: valRef2.tipo
    };//_cumpIncum

    Desincorporacion.create(_desincorporacion)
        .then(des => {
            des.createCumplimiento_Incumplimiento(_cumpIncum1)
            .then(cum =>{
                const _afectacion = {
                    kilometraje: _cumpIncum1.kilometraje
                }
                cum.createAfectacion(_afectacion);
            des.createCumplimiento_Incumplimiento(_cumpIncum2)
            .then(cum2 =>{
                const _afectacion = {
                    kilometraje: _cumpIncum2.kilometraje
                }
                cum2.createAfectacion(_afectacion).then(af =>{
                    res.json({ success: true, data: af });
                });
            });
            });
        })
        .catch(err => {
            console.log("ERROR >:", err);
            res.json({ success: false, message: err });
        })

};//addAfectacion2

controllers.registroDesincorporacion = async (req, res) => {
    //console.log("el body");
    console.log(req.body);
    const desincorporacion = {  
        fecha: req.body.fecha,
        hora: req.body.hora,
        linea: req.body.linea,
        estacion: req.body.estacion,
        solicita: req.body.solicita,
        informa: req.body.informa,
        empresa: req.body.empresa,
        economico: req.body.economico,
        motivo: req.body.motivo,
        odometro: req.body.odometro,
        creedencial: req.body.credencial,
        operador: req.body.nombre,
        jornada: req.body.jornada,
        observaciones: req.body.observaciones,
        tipoDesincorporacion: req.body.tipo,
        estadoFolio: req.body.edoFolio,
    };

    const _cumpIncum = {
        //idDesincorporacion: req.params.idDesincorporacion,
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

    Desincorporacion.create(desincorporacion)
        .then(des => {
            des.createCumplimiento_Incumplimiento(_cumpIncum)
            .then(cum =>{
                res.json({ success: true, data: des });
            });
        })
        .catch(err => {
            console.log("ERROR >:", err);
            res.json({ success: false, message: err });
        })
};//registroDesincorporacion

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
controllers.getFoliosAbiertos = async (req,res)=>{
    await Desincorporacion.findAll({ where: { estadoFolio: "Abierto" } })
    .then(foundFolios=>{
        res.json({success:true, data:foundFolios});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    });
}//getFoliosAbiertos

controllers.getOneDesincorporacion = async (req,res)=>{
    await Desincorporacion.findOne({ where: { idDesincorporacion: req.params.idDesincorporacion} })
    .then(foundDes=>{
        res.json({success:true, data:foundDes});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    });
}//getOneDesincorporacion

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
