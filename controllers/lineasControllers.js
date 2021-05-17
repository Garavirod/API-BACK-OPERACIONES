const db = require('../config/db');
/*const Acumulado_Estacion = require('../models/Acumulado_Estacion');
const Acumulado_Distancia = require('../models/Acumulados_Distancias');
const Acumulado = require('../models/Acumulados');
const Distancia = require('../models/Distancias');
const Ruta = require('../models/Rutas');*/
const lineasDB = require('../config/lineasDB');
const controllers = {};

//Borra los datos y tablas al correr el server siempre y caundo sync este en true
db.sync({force:false});
lineasDB.sync({force:false});

// POST
/*controllers.addAcumulado_Estacion = async(req,res)=>{
    const _acumEstacion = {
        idAcum: req.params.idAcum, //FK
        idEstacion: req.body.idEstacion //FK
    };//_acumEstacion

    Acumulado_Estacion.create(_acumEstacion)
    .then(col=>{
        console.log("Acumulado_Estacion successfuly added");
        res.json({ success: true, data: col });
    })
    .catch(err=>{
        console.log("ERROR >:", err);
            res.json({ success: false, message: err });
    });//create

}; //addAcumulado_Estacion

controllers.addAcumulado_Distancia = async(req,res)=>{
    const _acumDist = {
        idAcum: req.params.idAcum,//fk
        idDistancias: req.params.idDistancias,//Fk
    };//_acumDist

    Acumulado_Distancia.create(_acumDist)
    .then(col=>{
        console.log("Acumulado_Distancia successfuly added");
        res.json({ success: true, data: col });
    })
    .catch(err=>{
        console.log("ERROR >:", err);
            res.json({ success: false, message: err });
    });//create
};//addAcumulado_Distancia

controllers.addAcumulado = async(req,res)=>{
    const _acumulado = {
        acumulado: req.body.acumulado,
        tipo: req.body.tipo,
    };//_acumulado

    Acumulado.create(_acumulado)
    .then(col=>{
        console.log("Acumulado successfuly added");
        res.json({ success: true, data: col });
    })
    .catch(err=>{
        console.log("ERROR >:", err);
            res.json({ success: false, message: err });
    });//create
};//addAcumulado

controllers.addDistancia = async(req,res)=>{
    const _distancia = {
        idRuta: req.params.idRuta, //fk
        destinos: req.body.destinos,
        vuelta_comp: req.body.vuelta_comp
    };//_distancia

    Distancia.create(_distancia)
    .then(col=>{
        console.log("Distancia successfuly added");
        res.json({ success: true, data: col });
    })
    .catch(err=>{
        console.log("ERROR >:", err);
            res.json({ success: false, message: err });
    });//create
};//addDistancia

controllers.addRuta = async(req,res)=>{
    const _ruta = {
        idLinea: req.params.idLinea, //fk
        nombreRuta: req.body.nombreRuta,
        destinos: req.body.destinos
    };//_ruta

    Ruta.create(_ruta)
    .then(col=>{
        console.log("Ruta successfuly added");
        res.json({ success: true, data: col });
    })
    .catch(err=>{
        console.log("ERROR >:", err);
            res.json({ success: false, message: err });
    });//create
};//addRuta*/

// GET
controllers.getAllLineas = async (req,res) => {
    try { 
        await lineasDB.query("SELECT * FROM lineas")
        .then(([lineas, metadata]) => {
            res.json({success:true, data:lineas});
        })
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
    }
}//getAllLineas

controllers.getEstacionesByLinea = async (req,res) => {
    const idLinea = req.params.idLinea;
    try { 
        await lineasDB.query(`SELECT Id_estacion, nombre_es FROM estacioneslineas el INNER JOIN estaciones e ON e.Id_estacion=el.estacion_id WHERE el.linea_id='${idLinea}'`)
        .then(([estaciones, metadata]) => {
            res.json({success:true, data:estaciones});
        })
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
    }
}//getEstacionesByLinea

/*controllers.getAcumulado_Estaciones = async (req,res)=>{
    await Acumulado_Estacion.findAll()
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}//getAcumulado_Estaciones

controllers.getAcumulado_Distancias = async (req,res)=>{
    await Acumulado_Distancia.findAll()
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}//getAcumulado_Distancias

controllers.getAcumulados = async (req,res)=>{
    await Acumulado.findAll()
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}//getAcumulados

controllers.getDistancias = async (req,res)=>{
    await Distancia.findAll()
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}//getDistancias

controllers.getRutas = async (req,res)=>{
    await Ruta.findAll()
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}//getRutas

// DELETE
controllers.deleteAcumulado_Estacion = async (req,res)=>{
    //which?????????? both?????
    const idCumIncum = req.params.idCumIncum;
    await Acumulado_Estacion.destroy({ 
        where : {idIncum: idCumIncum}
    })
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
};//deleteAcumulado_Estacion

controllers.deleteAcumulado_Distancia = async (req,res)=>{
    //which?????????? both?????
    const idAfectacion = req.params.idAfectacion;
    await Acumulado_Distancia.destroy({ 
        where : {idAfectacion: idAfectacion}
    })
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
};//deleteAcumulado_Distancia

controllers.deleteAcumulado = async (req,res)=>{
    const idAcumulado = req.params.idAcum;
    await Acumulado.destroy({ 
        where : {idAcum: idAcumulado}
    })
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
};//deleteAcumulado

controllers.deleteDistancia = async (req,res)=>{
    const idDist = req.params.idDistancia;
    await Distancia.destroy({ 
        where : {idDistancia: idDist}
    })
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
};//deleteDistancia

controllers.deleteRuta = async (req,res)=>{
    const idRuta = req.params.idRuta;
    await Ruta.destroy({ 
        where : {idRuta: idRuta}
    })
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
};//deleteRuta*/

module.exports = controllers;