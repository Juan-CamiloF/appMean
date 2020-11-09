//Modulos internos
const multer = require("multer");
//Ruta del directorio donde quedaran los archivos
const directorio = "./public";
// DiskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, directorio);
  },
  filename: (req, file, cb) => {
    const filename =
      Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");
      cb(null,filename);
    },
});
// Cargar archivos
const cargarArchivo = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      console.log(file.mimetype);
    if (
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif" ||
      file.mimetype == "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error("Solo se acepta extenciones: .jpg, .jpeg, .gif, .png")
      );
    }
  },
});
module.exports = cargarArchivo;
