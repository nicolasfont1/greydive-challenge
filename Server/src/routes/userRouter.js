//Declaro una nueva instancia de Router.
const userRouter = require("express").Router();

// Importo los controladores que van a gestionar la lógica de cada solicitud.
const createUser = require("../controllers/user/createUser")

// Recordar que /user viene por defecto en nuestra ruta debido al middleware ubicado en routes/index.
userRouter.post("/", createUser)

module.exports = userRouter;