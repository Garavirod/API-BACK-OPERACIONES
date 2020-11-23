const db = require('../config/db');
const Colision = require('../models/Colisiones/Colision');
const DatosSeguroColision = require('../models/Colisiones/DatosSeguroColision');
const Lesionado = require('../models/Colisiones/Lesionado');
const DatosAutomovil = require('../models/Colisiones/DatosAutomovil');
const EconomicoColisionado = require('../models/Colisiones/EconomicoColisionado');
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


controllers.addEconomicoColisionado = async(req,res)=>{
    const _economicoColision = {
        empresa: req.body.empresa,
        economico: req.body.economico,     
        fk_colision: req.params.idColision,
    };

    EconomicoColisionado.create(_economicoColision)
    .then(ecCol=>{
        res.json({ success: true, data: ecCol });
    })
    .catch(err=>{
        console.log("ERROR >:", err);
            res.json({ success: false, message: err });
    });
};//addEconomicoColisionado


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
        marca: req.body.marca,
        submarca:req.body.submarca,
        color: req.body.color,
        placa: req.body.placa,     
        fk_colision: req.params.idColision,
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
    await Colision.findAll({
        order:[
            ["id", "DESC"]
        ] 
    })
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}

controllers.getEconomicos = async(req, res) => {
    await EconomicoColisionado. findAll({
        where:{
            fk_colision: req.params.idColision
        }
    })
    .then(economicos =>{
        res.json({success: true, data: economicos});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    });
}//getEconomicos


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


controllers.getSeguro = async (req,res) =>{
    await DatosSeguroColision.findAll({
        include:[ 
            {   model:Colision, 
                where:
                {
                    id:req.params.idColision
                }
            }           
        ],            
    })
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

controllers.deleteEconomico = async( req, res) =>{
    const id_Economico = req.params.idEconomico;
    await EconomicoColisionado.destroy(
        {
            where:{id:id_Economico}
        }
    )
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
};//deleteEconomico

controllers.deleteLesionado = async( req, res) =>{
    const id_lesionado = req.params.idlesionado;
    await Lesionado.destroy(
        {
            where:{id:id_lesionado}
        }
    )
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
};


controllers.deleteSeguro = async( req, res) =>{
    const id_seguro = req.params.idSeguro;
    await DatosSeguroColision.destroy(
        {
            where:{id:id_seguro}
        }
    )
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
};
controllers.deleteAutomovil = async( req, res) =>{
    const id_Automovil = req.params.idAutomovil;
    await DatosAutomovil.destroy(
        {
            where:{id:id_Automovil}
        }
    )
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
};


module.exports = controllers;
