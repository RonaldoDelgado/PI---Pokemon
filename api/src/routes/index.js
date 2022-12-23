const { Router } = require("express");
const express = require("express");
const PokemonsRouter = require("./PokemonsRouter");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const api = await axios
    .get("https://pokeapi.co/api/v2/pokemon")
    .then((data) => {
      return data.data.results;
    });

  const api2 = await axios.get(api[0].url);
  const api3 = {
    id: api2.data.id,
    nombre: api2.data.name,
    health: api2.data.stats[0].base_stat,
    attack: api2.data.stats[1].base_stat,
    defense: api2.data.stats[2].base_stat,
    speed: api2.data.stats[5].base_stat,
    height: api2.data.height,
    weight: api2.data.weight,
  };
  res.status(202).send(api3);
});

router.use("/pokemons", PokemonsRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
