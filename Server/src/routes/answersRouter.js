//Declaro una nueva instancia de Router.
const answersRouter = require("express").Router();

// Importo los controladores que van a gestionar la lógica de cada solicitud.
const createAnswers = require("../controllers/answers/createAnswers")
const editAnswers = require("../controllers/answers/editAnswers")
const getAnswers = require("../controllers/answers/getAnswers")

// Recordar que /answers viene por defecto en nuestra ruta debido al middleware ubicado en routes/index.
answersRouter.post("/", createAnswers)
answersRouter.put("/", editAnswers)
answersRouter.get("/", getAnswers)

module.exports = answersRouter;