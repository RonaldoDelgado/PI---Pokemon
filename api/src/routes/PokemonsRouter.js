const { Router } = require("express");
const { getAllPokemons } = require("../controllers/controller.js");
const axios = require("axios");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const pokemons = await getAllPokemons();
    const name = req.query.name;
    if (name) {
      const pokemon = pokemons.filter(
        (obj) => obj.name.toLowerCase == name.toLowerCase
      );
      pokemon.length
        ? res.status(200).send(pokemon)
        : res.status(404).send("Personaje No Encontrado");
    } else {
      res.status(202).send(pokemons);
    }
  } catch (error) {
    res.status(404).send("EL ERROR: " + error);
  }
});

module.exports = router;
