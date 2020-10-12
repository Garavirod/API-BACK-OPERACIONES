const db = require('../config/db');
const Informantes = require('../models/Desincorporaciones/Informantes');
const Motivos = require('../models/Desincorporaciones/Motivos');
const controllers = {};
//Borra los datos y tablas al correr el server siempre y caundo sync este en true
db.sync({force:false});

// POST
controllers.addMotivos = async(req,res)=>{
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
controllers.addInformantes = async(req,res)=>{
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
controllers.getMotivos = async (req,res)=>{
    await Motivos.findAll()
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}
controllers.getInformantes = async (req,res)=>{
    await Informantes.findAll()
    .then(obj=>{
        res.json({success:true, data:obj});
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
}

controllers.deleteInformantes = async (req,res)=>{
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
}


module.exports = controllers;