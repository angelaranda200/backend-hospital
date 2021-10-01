const { response } = require('express');
const Usuario = require('../models/usuario');
const Medicos = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async (req,res=response)=>{

    const busqueda = req.params.busqueda;
    const regexp = new RegExp(busqueda,'i');

   

    const [usuarios,medicos,hospitales] = await Promise.all([
         Usuario.find({nombre:regexp}),
         Medicos.find({nombre:regexp}),
         Hospital.find({nombre:regexp}),
    ]);


    res.json({
        
        ok:true,
        usuarios,
        medicos,
        hospitales
    })
}

const getDocumentosColeccion = async (req,res=response)=>{

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regexp = new RegExp(busqueda,'i');

    let data =[];

    switch (tabla) {
        case 'medicos':
            data = await Medicos.find({nombre:regexp})
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img');
            break;
        case 'hospitales':
            data = await Medicos.find({nombre:regexp})
                                .populate('usuario','nombre img');
                                
            break;
        case 'usuarios':
            data = await Usuario.find({nombre:regexp});
            break;
    
        default:
            res.status(400).json({
                ok:false,
                msg:'La tabla tiene que ser usuarios/medicos/hospitales'
            });
            
    }

   

    res.json({
        
        ok:true,
        resultados:data 
    })
}

module.exports={
    getTodo,
    getDocumentosColeccion
}

