// Modulos internos
const moongoose = require("mongoose");
// Esquema
const esquemaTablero = new moongoose.Schema({
  idUsuario: String,
  nombre: String,
  descripcion: String,
  sticker: String,
  estado: String,
  fecha: {
    type: Date,
    default: Date.now,
  },
});
// Creamos los exports
const Tablero = moongoose.model("tablero", esquemaTablero);
module.exports.Tablero = Tablero;
