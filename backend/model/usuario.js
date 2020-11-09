// Modulos internos
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Esquema
const esquemaUsuario = new mongoose.Schema({
  nombre: {
    type: String,
  },
  cedula: {
    type: String,
  },
  edad: {
    type: Number,
  },
  correo: {
    type: String,
  },
  pass: {
    type: String,
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
});
// Generar el JWT
esquemaUsuario.methods.generateJWT = function() {
  return jwt.sign(
    {
      _id: this._id,
      nombre: this.nombre,
      correo: this.correo,
    },
    "clave"
  );
};
// Crear los exports
const Usuario = mongoose.model('usuario', esquemaUsuario)
module.exports.Usuario = Usuario;
// En caso de que se necesite
module.exports.esquemaUsuario = esquemaUsuario;