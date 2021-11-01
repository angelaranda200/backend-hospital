const {response}= require('express');
const  jwt  = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT =(req,res=response,next)=>{
    
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la peticion'
        })
    }    
    try {
        const { uid } = jwt.verify(token,process.env.JWT_SECRET);
        req.uid = uid;
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        })
    }
    
    
}

const validarADMIN_ROLE =async(req,res=response,next)=>{
    const uid = req.uid;
    try {
        const UsuarioDB = await Usuario.findById(uid);
        if(!UsuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Usuario no existe'
            })
        }

        if(UsuarioDB.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok:false,
                msg:'No tiene permisos para realizar esta accion'
            })
        }

        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
        });
    }
}

const validarADMIN_ROLE_o_MismoUsuario =async(req,res=response,next)=>{
    const uid = req.uid;
    const id = req.params.id;
    try {
        const UsuarioDB = await Usuario.findById(uid);
        if(!UsuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Usuario no existe'
            })
        }

        if(UsuarioDB.role === 'ADMIN_ROLE' || uid!==id){
            next();
        }else{
            return res.status(403).json({
                ok:false,
                msg:'No tiene permisos para realizar esta accion'
            })
        }

        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
        });
    }
}

module.exports={
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}