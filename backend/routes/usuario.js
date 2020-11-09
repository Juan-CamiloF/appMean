// Modulos internos
const express = require("express");
const router = express.Router();
// Modulo creados
const { Usuario } = require("../model/usuario");
// Ruta
router.post("/", async (req, res) => {
  let usuario = await Usuario.findOne({ correo: req.body.correo });
  // Si encuentra el correo en BD
  if (usuario) return res.status(400).send("El usuario ya esta registrado");
  //Si NO encuentra el correo en BD
  usuario = new Usuario({
    nombre: req.body.nombre,
    cedula: req.body.cedula,
    edad: req.body.edad,
    correo: req.body.correo,
    pass: req.body.pass,
  });
  // Guardamos el usuario que se va a crear con el JWT
  const result = await usuario.save();
  const jwtToken = usuario.generateJWT();
  res.status(200).send({ jwtToken });
});
// Exports
module.exports = router;
