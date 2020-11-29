//Modulosinternos
const express = require("express");
const router = express.Router();
//Modulos creados
const { Tablero } = require("../model/tablero");
const { Usuario } = require("../model/usuario");
const auth = require("../middleware/auth");
const cargarArchivo = require("../middleware/file");
//rutas
//Listar actividad
router.get("/lista", auth, async (req, res) => {
  //Buscamos el usuario
  const usuario = await Usuario.findById(req.usuario._id);
  // Si no existe el usuario
  if (!usuario) return res.status(400).send("El usuario no existe");
  //Si el usuario existe
  const tablero = await Tablero.find({ idUsuario: req.usuario._id });
  res.send(tablero);
});
//Registrar actividad
router.post("/", auth, async (req, res) => {
  //Obtenemos el id del ususario autenticado
  const usuario = await Usuario.findById(req.usuario._id);
  //Si el usuario no existe
  if (!usuario) return res.status(400).send("El usuario no existe");
  //Si el usuario existe creamos una actividad para ese usuario
  const tablero = new Tablero({
    idUsuario: usuario._id,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    estado: req.body.estado,
  });
  //Enviamos resultados
  const result = await tablero.save();
  res.status("200").send(result);
});
// Crear actividad con imagen
router.post(
  "/cargarArchivo",
  cargarArchivo.single("sticker"),
  auth,
  async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    //Validamos si existe el usuario
    const usuario = await Usuario.findById(req.usuario._id);
    //Si el usuario no existe
    if (!usuario) return res.status(400).send("El usuario no existe");
    //Si existe el usuario continua el proceso
    let rutaImg = null;
    if (req.file.filename) {
      rutaImg = url + "/public/" + req.file.filename;
    } else {
      rutaImg = null;
    }
    //Guardar la actividad
    const tablero = new Tablero({
      idUsuario: usuario._id,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      sticker: rutaImg,
      estado: req.body.estado,
    });
    //Enviamos resultados
    const result = await tablero.save();
    res.status("200").send(result);
  }
);

//Actualizar actividad
router.put("/", auth, async (req, res) => {
  //Buscamos el usuario
  const usuario = await Usuario.findById(req.usuario._id);
  //SI el usuario no existe
  if (!usuario) return res.status(400).send("El usuario no existe");
  //Si el usuario existe
  const tablero = await Tablero.findByIdAndUpdate(
    req.body._id,
    {
      idUsuario: req.usuario._id,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      estado: req.body.estado,
      fecha: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!tablero)
    return res.status(400).send("No tienen actividad asignada a este usuario");
  res.status(200).send(tablero);
});

//Eliminar actividad
router.delete("/:_id", auth, async (req, res) => {
  // Buscamos usuario
  const usuario = await Usuario.findById(req.usuario._id);
  // si no existe el usuario
  if (!usuario) return res.status(400).send("El usuario no existe en BD");
  // Si existe eliminamos una actividad
  const tablero = await Tablero.findByIdAndDelete(req.params._id);
  // si no existe esa actividad
  if (!tablero)
    return res.status(400).send("No se encontro actividad para eliminar");
  // si se elimina una tarea
  res.status(200).send({ message: "Actividad eliminada" });
});


module.exports = router;
