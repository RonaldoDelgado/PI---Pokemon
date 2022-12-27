const { Router } = require("express");
const { getAllPokemons, postPokemon } = require("../controllers/controller.js");
const axios = require("axios");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const pokemons = await getAllPokemons();
    const name = req.query.name;
    if (name) {
      console.log(name);
      let pokemonName = pokemons.filter((obj) => obj.name === name);
      pokemonName.length
        ? res.status(200).send(pokemonName)
        : res.status(404).send("Personaje No Encontrado");
    } else {
      res.status(202).send(pokemons);
    }
  } catch (error) {
    res.status(404).send("EL ERROR: " + error);
  }
});

router.post("/", async (req, res) => {
  try {
    await postPokemon(req.body);
    res.status(202).send("Pokemon creado");
  } catch (error) {
    res.status(404).send("Pokemon no creado");
  }
});
module.exports = router;
