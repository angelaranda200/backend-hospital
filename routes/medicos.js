const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();
const { validarJWT } = require("../middlewares/validar-jwt");

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}= require("../controllers/medicos");

router.get("/", getMedicos);

router.post("/",
 [
     validarJWT,
     check('nombre','El nombre del medico es obligatorio').not().isEmpty(),
     check('hospital','El hospital id debe de ser valido').isMongoId(),
     validarCampos
 ], 
 crearMedico);

router.put("/:id", 
[
    check('nombre','El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital','El hospital id debe de ser valido').isMongoId(),
    validarJWT,

], actualizarMedico);

router.delete("/:id",validarJWT, borrarMedico);

module.exports = router;
