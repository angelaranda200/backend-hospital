const { response, request } = require("express");

const Medico = require('../models/medico');

const getMedicos =async(req,res=response)=>{

    const medicos = await Medico.find()
                                .populate('usuario','nombre')
                                .populate('hospital','nombre');

    res.json({
        ok:true,
        medicos
    })

}

const getMedicoById =async(req,res=response)=>{

    const id = req.params.id;

    try {
        
        const medico = await Medico.findById(id)
                                    .populate('usuario','nombre')
                                    .populate('hospital','nombre');
    
                                    
        res.json({
            ok:true,
            medico
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg:'Hable con el admin'
        })
    }

}

const crearMedico =async(req=request,res=response)=>{

    const uid = req.uid;
    
    const medico = new Medico({usuario:uid,...req.body});



    try {
        const medicoDB = await medico.save();


        res.json({
            ok:true,
            medico:medicoDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
        })
    }
    

}
const actualizarMedico =async(req,res=response)=>{

    const id = req.params.id;
    const uid = req.uid;
    


    try {
        const MedicoDB = Medico.findById(id);
        if (!MedicoDB) {
            res.status(404).json({
                ok:false,
                msg:'Medico no encontrado por id'
            })
        }

        const cambiosMedicos = {
            ...req.body,
            usuario:uid
        }
        const medicoactualizado = await Medico.findByIdAndUpdate(id,cambiosMedicos,{new:true})

        res.json({
            ok:true,
            msg:'Medico actualizado',
            medicoactualizado
        })
        
        
        
    } catch (error) {
        res.status(404).json({
            ok:false,
            msg:'Hable con el admin'
        })
        
    }

    res.json({
        ok:true,
        msg:'actualizarMedico'
    })

}
const borrarMedico =async(req,res=response)=>{

    const id = req.params.id;
    
    


    try {
        const MedicoDB = Medico.findById(id);
        if (!MedicoDB) {
            res.status(404).json({
                ok:false,
                msg:'Medico no encontrado por id'
            })
        }

        await Medico.findByIdAndDelete(id);

        

        res.json({
            ok:true,
            msg:'Medico eliminado',
            
        })
        
        
        
    } catch (error) {
        res.status(404).json({
            ok:false,
            msg:'Hable con el admin'
        })
        
    }

    

}





module.exports={
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
}