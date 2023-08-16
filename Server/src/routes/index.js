// Importo la función Router, la cual me permite crear un objeto que maneja
// las solicitudes HTTP que recibe el server hacia disntitos endpoints de forma organizada y modular.
const { Router } = require('express');

// Importo los enrutadores hijos que contienen los endpoints de cada ruta.
const userRouter = require("./userRouter");
const answersRouter = require("./answersRouter")

// Declaro una instancia de Router para poder redirigir las solicitudes hacia la ruta solicitada.
// En este caso router es el enrutador principal, los importados mas arriba se denominan enrutadores hijos.
const router = Router();

// Redirecciono la solicitud, usando .use() podemos especificar funciones de middleware o enrutado.
router.use("/user", userRouter);
router.use("/answers", answersRouter);

module.exports = router;