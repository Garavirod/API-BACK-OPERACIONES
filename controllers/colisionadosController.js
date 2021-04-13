const db = require('../config/db');
const Colision = require('../models/Colisiones/Colision');
const DatosSeguroColision = require('../models/Colisiones/DatosSeguroColision');
const Lesionado = require('../models/Colisiones/Lesionado');
const DatosAutomovil = require('../models/Colisiones/DatosAutomovil');
const EconomicoColisionado = require('../models/Colisiones/EconomicoColisionado');
const Op =  require("sequelize").Op;
const sequelize = require('../config/db');
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
        hora: req.body.hora,
        longitud: req.body.longitud,
        latitud: req.body.latitud,
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
    // Parámetros para paginación
    const maxElements = parseInt(req.query.max);
    const pgNumber = parseInt(req.query.page);
    const skip = (pgNumber - 1) * maxElements;

    await Colision.findAndCountAll({
        order:[
            ["id", "DESC"]
        ],
        offset:skip,
        limit:maxElements 
    })
    .then(result=>{      
        res.status(200).json({
            success:true,
            data:result.rows,
            count:result.count
        });
    })
    .catch (error=>{
        console.log(error);
        res.status(500).json({success:false});

    });
    
}//getColisiones

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

controllers.getColEmpresaTiempo = async(req, res) => {

    await EconomicoColisionado.findAll({
        attributes: ['id','empresa'],
        where:{
            empresa: req.params.empresa
        },
        include: [{
            model: Colision,
            attributes: ['id', 'fecha'],
            where: db.where(db.fn('YEAR', db.col('fecha')), req.params.anio)
        }]
    })
    .then(colEmpresa =>{
        //console.log("good", colEmpresa);
        res.json({success: true, data: colEmpresa});
    })
    .catch(err=>{
        //console.log("err", err);
        res.json({success:false, message:err});
    });
}//getColEmpresaTiempo

controllers.getEmpresasColisionadas = async(req, res) => {
    await EconomicoColisionado.findAll({
        attributes: ['empresa'],
        group: ['empresa']
    })
    .then(empresas =>{
        //console.log("good", empresas);
        res.json({success: true, data: empresas});
    })
    .catch(err=>{
        //console.log("err", err);
        res.json({success:false, message:err});
    });
}//getEmpresasColisionadas

controllers.getResponsables = async(req, res) => {
    await DatosSeguroColision.findAll({
        attributes: [
          'paga',
          [db.literal('COUNT(*)'), 'countOfResp']
        ],
        group: 'paga'
    })
    .then(responsables =>{
        //console.log("good", responsables);
        res.json({success: true, data: responsables});
    })
    .catch(err=>{
        //console.log("err", err);
        res.json({success:false, message:err});
    });
}//getResponsables


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


/* 
    Traer todas la colisiones agrupadas por año 
    y el número total de colisiones en ese año */
controllers.getColisionesByYear = async (req,res) =>{    
    await Colision.findAll({        
        attributes:['fecha',[db.fn('COUNT', db.col('fecha')), 'no_colisions']],
        // where: db.where(db.fn('YEAR', db.col('fecha')), year),
        group:[db.fn('YEAR', db.col('fecha'))],        

    })
    .then(data=>{
        res.json({success:true, data:data});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    });
}

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
