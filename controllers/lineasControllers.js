const db = require('../config/db');
const Acumulado_Estacion = require('../models/Lineas/Acumulado_Estacion');
const Acumulado_Distancia = require('../models/Lineas/Acumulados_Distancias');
const Acumulado = require('../models/Lineas/Acumulados');
const Distancia = require('../models/Lineas/Distancias');
const RutaEstacion = require('../models/Lineas/Rutas_Estaciones');
const Ruta = require('../models/Lineas/Rutas');
const controllers = {};

//Borra los datos y tablas al correr el server siempre y caundo sync este en true
db.sync({force:false});

////////////////POST////////////////
controllers.addAcumulado_Estacion = async(req,res)=>{
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

controllers.addRutaEstaciones = async(req,res)=>{
    const _rutaEstaciones = {
        idEstacion: req.body.idEstacion, //FK
        idRuta: req.params.idRuta //fk
    };//_rutaEstaciones

    RutaEstacion.create(_rutaEstaciones)
    .then(col=>{
        console.log("Ruta successfuly added");
        res.json({ success: true, data: col });
    })
    .catch(err=>{
        console.log("ERROR >:", err);
            res.json({ success: false, message: err });
    });//create
};//addRutaEstaciones

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
};//addRuta

////////////////GET////////////////
controllers.getAcumulado_Estaciones = async (req,res)=>{
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

controllers.getRutasEstaciones = async (req,res)=>{
    await RutaEstacion.findAll()
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}//getRutasEstaciones

controllers.getRutas = async (req,res)=>{
    await Ruta.findAll()
    .then(obj=>{
        res.json({success:true, data:obj});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
}//getRutas

////////////////DELETE////////////////
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

controllers.deleteRutaEstacion = async (req,res)=>{
    const idRutaEstacion = req.params.idRutaEstacion;
    await RutaEstacion.destroy({ 
        where : {idRutaEstacion: idRutaEstacion}
    })
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
};//deleteRutaEstacion

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
};//deleteRuta

module.exports = controllers;