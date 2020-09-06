const db = require('../config/db');
const Colision = require('../models/Colisiones/Colision');
const DatosSeguroColision = require('../models/Colisiones/DatosSeguroColision');
const Lesionado = require('../models/Colisiones/Lesionado');
const DatosAutomovil = require('../models/Colisiones/DatosAutomovil');
const controllers = {};

//Borra los datos y tablas al correr el server siempre y caundo sync este en true
db.sync({force:false});

// POST
controllers.addColision = async(req,res)=>{
    const _colision = {
        sentido: req.body.sentido,
        motivo: req.body.motivo,
        interseccion: req.body.interseccion,
        colonia : req.body.colonia,
        fecha:req.body.fecha,
        hora: req.body.hora 
    };

    Colision.create(_colision)
    .then(col=>{
        res.json({ success: true, data: col });
    })
    .catch(err=>{
        console.log("ERROR >:", err);
            res.json({ success: false, message: err });
    });
};


controllers.addSeguro = async(req,res)=>{
    const _colision = await Colision.findOne({where:{id:req.params.idColision}});
    const _datosSeguro = {
        nombre_seguro: req.body.nombre_seguro,
        tipo_seguro: req.body.tipo_seguro,
        paga: req.body.paga,
        comentarios : req.body.comentarios,
    };

    DatosSeguroColision.create(_datosSeguro)
    .then(obj=>{
        obj.addColisions(_colision);
        res.json({ success: true, data: obj });
    })
    .catch(err=>{
        console.log("ERROR >:", err);
            res.json({ success: false, message: err });
    });
};

controllers.addLesionado = async(req,res)=>{    
    const _datosLesionado = {
        sexo: req.body.sexo,
        tipo_lesionado: req.body.tipo_lesionado,     
        fk_colision: req.params.idColision,
    };

    Lesionado.create(_datosLesionado)
    .then(obj=>{        
        res.json({ success: true, data: obj });
    })
    .catch(err=>{
        console.log("ERROR >:", err);
            res.json({ success: false, message: err });
    });
};


controllers.addAutomovil = async(req,res)=>{    
    const _datosAutomovil = {
        sexo_contuctor: req.body.sexo,
        marca: req.body.tipo_lesionado,
        submarca:req.body.submarca,
        color: req.body.color,
        placa: req.body.placa,     
        fk_colision: req.params.idColision
    };

    DatosAutomovil.create(_datosAutomovil)
    .then(obj=>{        
        res.json({ success: true, data: obj });
    })
    .catch(err=>{
        console.log("ERROR >:", err);
            res.json({ success: false, message: err });
    });
};


// GET
controllers.getColisiones = async (req,res)=>{
    await Colision.findAll()
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}


controllers.getAutomovil = async (req,res) =>{
    await DatosAutomovil.findAll({where:{
        fk_colision: req.params.idColision
     }})
     .then(obj=>{
         res.json({success:true, data:obj});
     })
     .catch(err=>{
         res.json({success:false, message:err});
     })
};

controllers.getLesionados = async (req,res) =>{
    await Lesionado.findAll({where:{
        fk_colision: req.params.idColision
     }})
     .then(obj=>{
         res.json({success:true, data:obj});
     })
     .catch(err=>{
         res.json({success:false, message:err});
     })
};

// DELETE

controllers.deleteColision = async (req,res)=>{
    const id_colision = req.params.idColision;
    await Colision.destroy({ 
        where : {
            id: id_colision
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