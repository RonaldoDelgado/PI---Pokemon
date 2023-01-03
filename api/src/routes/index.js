const { Router } = require("express");
const express = require("express");
const PokemonsRouter = require("./PokemonsRouter");
const TypeRouter = require("./TypeRoute");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use(express.json());

router.use("/pokemon", PokemonsRouter);
router.use("/type", TypeRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
