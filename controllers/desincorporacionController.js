const db = require('../config/db');
const Cumplimiento_incumplimiento = require('../models/Desincorporaciones/Cumplimiento_Incumplimiento');
const Afectacion = require('../models/Desincorporaciones/Afectacion');
const Desincorporacion = require('../models/Desincorporaciones/Desincorporacion');
const Incorporacion = require('../models/Desincorporaciones/Incorporacion');
const sequelize = require('../config/db');
const Op =  require("sequelize").Op;
const Informantes = require('../models/Desincorporaciones/Informantes');
const Motivos = require('../models/Desincorporaciones/Motivos');
const controllers = {};
//Borra los datos y tablas al correr el server siempre y caundo sync este en true
db.sync({force:false});
/*Afectacion.drop();
Cumplimiento_incumplimiento.drop();
Incorporacion.drop();
Desincorporacion.drop();*/
// POST
/*
controllers.addCumplimiento_incumplimiento = async(req,res)=>{
    const _cumpIncum = {
        idDesincorporacion: req.params.idDesincorporacion, //FK
        referencia: req.body.ruta_referencia,
        ida: req.body.ref_ida,
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

}; //addCumpl*/

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
        credencial: req.body.credencial,
        nombre: req.body.nombre,
        jornada: req.body.jornada,
        observaciones: req.body.observaciones,
        tipo: req.body.tipo,
        edoFolio: req.body.edoFolio,
    };

    const _cumpIncum = {
        //idDesincorporacion: req.params.idDesincorporacion,
        ruta_referencia: req.body.ruta_referencia,
        ref_ida: req.body.ref_ida,
        /*se quitó
        vuelta: req.body.ref_vuelta,*/
        num_vuelta:req.body.num_vuelta,
        num_ida: req.body.num_ida,
        num_regreso:req.body.num_regreso,
        tramo_desde: req.body.tramo_desde,
        tramo_hasta: req.body.tramo_hasta,
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
        credencial: desincorporacion.credencial,
        nombre: desincorporacion.nombre,
        jornada: desincorporacion.jornada,
        observaciones: desincorporacion.observaciones,
        tipo: desincorporacion.tipo,
        edoFolio: desincorporacion.edoFolio,
    };
    const _cumpIncum1 = {
        ruta_referencia: valRef1.ruta_referencia,
        ref_ida: valRef1.ref_ida,
        num_vuelta:valRef1.num_vuelta,
        num_ida: valRef1.num_ida,
        num_regreso:valRef1.num_regreso,
        tramo_desde: valRef1.tramo_desde,
        tramo_hasta: valRef1.tramo_hasta,
        kilometraje: valRef1.kilometraje,
        tipo: valRef1.tipo
    };//_cumpIncum
    const _cumpIncum2 = {
        ruta_referencia: valRef2.ruta_referencia,
        ref_ida: valRef2.ref_ida,
        num_vuelta:valRef2.num_vuelta,
        num_ida: valRef2.num_ida,
        num_regreso:valRef2.num_regreso,
        tramo_desde: valRef2.tramo_desde,
        tramo_hasta: valRef2.tramo_hasta,
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
        credencial: req.body.credencial,
        nombre: req.body.nombre,
        jornada: req.body.jornada,
        observaciones: req.body.observaciones,
        tipo: req.body.tipo,
        edoFolio: req.body.edoFolio,
    };

    const _cumpIncum = {
        //idDesincorporacion: req.params.idDesincorporacion,
        ruta_referencia: req.body.ruta_referencia,
        ref_ida: req.body.ref_ida,
        num_vuelta:req.body.num_vuelta,
        num_ida: req.body.num_ida,
        num_regreso:req.body.num_regreso,
        tramo_desde: req.body.tramo_desde,
        tramo_hasta: req.body.tramo_hasta,
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

controllers.registroIncorporacion = async (req, res) => {
    const idDesinc = req.params.idFolio;
    const incorporacion = {
        idDesincorporacion: idDesinc,
        informa: req.body.informa,
        estacion: req.body.estacion,
        economico: req.body.economico,
        empresa: req.body.empresa,       
        odometro: req.body.odometro,
        credencial: req.body.credencial,
        nombre: req.body.nombre,
        fecha: req.body.fecha,
        hora: req.body.hora,                       
        sentido: req.body.sentido,
        entrada: req.body.entrada,
        status: req.body.status,
        hra_retrazo: req.body.hra_retrazo,
        min_retrazo: req.body.min_retrazo,
        seg_retrazo: req.body.seg_retrazo,
    };

    Incorporacion.create(incorporacion)
        .then(inc => {
            console.log("incorporacion created");
            Desincorporacion.update({edoFolio:"Cerrado"}, {where: {id:idDesinc} })
            .then(des => {
                console.log("desincorporacin updated");
                res.json({ success: true, data: inc });
            })
        })
        .catch(err => {
            console.log("ERROR >:", err);
            res.json({ success: false, message: err });
        })
};//registroIncoporacion

controllers.updateDesincorporacion = async (req, res) => {
    const desincorporacion = {  
        id: req.body.id,
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
        credencial: req.body.credencial,
        nombre: req.body.nombre,
        jornada: req.body.jornada,
        observaciones: req.body.observaciones,
        tipo: req.body.tipo,
        edoFolio: req.body.edoFolio,
    };

    Desincorporacion.update(desincorporacion, {where: {id:desincorporacion.id} })
        .then(des => {
            console.log("desincorporacin updated");
            res.json({ success: true, data: des });
        })
        .catch(err => {
            console.log("ERROR >:", err);
            res.json({ success: false, message: err });
        })
};//updateDesincorporacion

// GET
controllers.getFoliosAbiertos = async (req,res)=>{
    await Desincorporacion.findAll({ where: { edoFolio: "Abierto" } })
    .then(foundFolios=>{
        res.json({success:true, data:foundFolios});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    });
}//getFoliosAbiertos
/*
controllers.getOneDesincorporacion = async (req,res)=>{
    await Desincorporacion.findOne({ where: { id: req.params.idDesincorporacion} })
    .then(foundDes=>{
        res.json({success:true, data:foundDes});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    });
}//getOneDesincorporacion*/

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
controllers.getCumIncumsDeFolio = async(req, res) => {
    await Cumplimiento_incumplimiento.findAll({ where: { idDesincorporacion: req.params.idFolio } })
        .then(cumplIncum => {
            //console.log(cumplIncum);
            console.log("cumplimiento_incumplimiento found");
            res.json({ success: true, data: cumplIncum });
        })
        .catch((err) => {
            res.json({success:false, message:err});
        });
};//getCumIncumsDeFolio


controllers.getAfectaciones = async (req,res)=>{
    await Afectacion.findAll()
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}//getAfectaciones


controllers.addMotivo = async(req,res)=>{
    const _Motivos = {
        motivo: req.body.motivo
    };

    Motivos.create(_Motivos)
    .then(col=>{
        res.json({ success: true, data: col });
    })
    .catch(err=>{
        console.log("ERROR >:", err);
            res.json({ success: false, message: err });
    });
};
controllers.addInformante = async(req,res)=>{
    const _Informantes = {
        motivo: req.body.motivo
    };

    Motivos.create(_Informantes)
    .then(col=>{
        res.json({ success: true, data: col });
    })
    .catch(err=>{
        console.log("ERROR >:", err);
            res.json({ success: false, message: err });
    });
};

// GET
controllers.getMotivo = async (req,res)=>{
    await Motivos.findAll()
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}//getAfectaciones

    //getOne
controllers.getOneAfectacion = async(req, res) => {
    await Afectacion.findOne({ where: { id: req.body.idAfectacion } })
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

/**
 * Retorna todos los regitros de una desincorporacion 
 * de tipo Incumplimiento o Apoyo toamando en cuenta que todos
 * los registros sean de tipo cerrado o cerrado sin incorporar
 */
controllers.getFoliosDataBrief = async (req, res)=>{
    
    let _tipo=null;
    switch (req.params.tipoDesinc) {
        case "inc":
            _tipo = "Incumplido";
            break;
        case "apo":
            _tipo = "Apoyo";
            break;
        case "afe":
            _tipo = "Afectación"
            break;
        default:            
            res.json({success:false, message:"No data"});
            break;
    }    
    await Desincorporacion.findAll({
        attributes:["id","fecha","hora","empresa","motivo","jornada","estacion","linea","observaciones","tipo"],
        include:[ 
            {   
                model:Cumplimiento_incumplimiento,
                // where:{tipo:_tipo}                 
            }              
        ],
        where:{
            edoFolio:{
                [Op.or]:["Cerrado","Cerrado sin incorporar"]
            },
            tipo:_tipo
        },
        order:["fecha"] 
    })
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        console.log(err);
        res.json({success:false, message:err});
    })
}

/* 
    Trae la suma del kilometraje total agrupado por fechas
 */
controllers.getKilometrajeByFecha = async (req,res) =>{
    let _tipo=null;
    // Asigna a tipo el tipo de resigistros que se desean obtener
    switch (req.params.tipoDesinc) {
        case "inc":
            _tipo = "Incumplido";
            break;
        case "apo":
            _tipo = "Apoyo";
            break;
        default:            
            res.json({success:false, message:"No data"});
            break;
    }    
    await Desincorporacion.findAll({
        attributes:[
            "id",
            "fecha",
            [
                sequelize.fn(
                    'sum',sequelize.col('kilometraje')
                ),
                'km_total'
            ]
        ],
        include:[ 
            {   model:Cumplimiento_incumplimiento,               
                where:{tipo:_tipo},
                attributes:[]
            }           
        ],
        where:{
            edoFolio:{
                [Op.or]:["Cerrado","Cerrado sin incorporar"]
            }
        },
        group:["fecha"] 
    })
}
controllers.getInformante = async (req,res)=>{
    await Informantes.findAll()
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        console.log(err);
        res.json({success:false, message:err});
    })
};


// DELETE
controllers.deleteCumplimiento_incumplimiento = async (req,res)=>{
    const idCumIncum = req.params.idCumIncum;
    await Cumplimiento_incumplimiento.destroy({ 
        where : {id: idCumIncum}
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
        where : {id: idAfectacion}
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
}

// DELETE


controllers.deleteMotivo = async (req,res)=>{
    const id_Motivos = req.params.idMotivo;
    await Motivos.destroy({ 
        where : {
            id: id_Motivos
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
}

controllers.deleteInformante = async (req,res)=>{
    const id_Informantes = req.params.idInformante;
    await Informantes.destroy({ 
        where : {
            id: id_Informantes
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
