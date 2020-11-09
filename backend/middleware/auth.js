const jwt = require("jsonwebtoken");
// Creamos validación para identificar el usuario logueado y todos sus procesos
function auth (req,response, next) {
    let jwtToken = req.header("Authorization");
    // Split al JWT para separar el Beare que pone por defecto el header del auth
    jwtToken = jwtToken.split(" ")[1];
    // Si el token no existe
    if(!jwtToken) return response.status(405).send("No hay token para un acceso");
    // SI el toke existe
    try {
        const payload = jwt.verify(jwtToken,"clave");
        req.usuario = payload;
        next();
    } catch (error) {
        response.status(405).send("Token sin auterización");
    }
}
//Exports
module.exports = auth;