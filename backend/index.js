// Modulos internos
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// Modulos creados
const usuario = require("./routes/usuario");
const auth = require("./routes/auth");
const tablero = require("./routes/tablero");
// App
const app = express();
app.use(cors());
app.use(express.json()); // Indica que todo lo va manejar en formato Json
app.use("/api/usuario/", usuario);
app.use("/api/auth/", auth);
app.use("/api/tablero/", tablero);
//Puerto para ejecutar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Ejecutando en el localhost:" + port));  
// Conexión con MongoDB
mongoose
  .connect("mongodb://localhost/scrum", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión a MondoDB: Hecho!"))
  .catch((error) => console.log("Conexión a MongoDB: efe"));
