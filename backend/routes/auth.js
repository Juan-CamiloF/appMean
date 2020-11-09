// Modulos de Node
const express = require("express");
const router = express.Router();
// Modulos creados
const { Usuario } = require("../model/usuario");
const auth = require("../middleware/auth");
//Ruta
router.post("/", async (require, response) => {
  //Validar que el correo exista
  const usuario = await Usuario.findOne({ correo: require.body.correo });
  //Si el correo no existe
  if (!usuario) return response.status(400).send("Correo o contraseña incorrectos");
  //Si el pass no existe
  if (usuario.pass !== require.body.pass) return response.status(400).send("Correo o contraseña incorrectos");
  // Generar un JWT
  const jwtToken = usuario.generateJWT();
  response.status(200).send({ jwtToken });
});
module.exports = router;
