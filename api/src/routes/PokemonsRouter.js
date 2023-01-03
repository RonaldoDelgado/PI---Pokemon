const { Router } = require("express");
const {
  getAllPokemons,
  postPokemon,
  getIdPokemon,
  getInfoDB,
} = require("../controllers/controller.js");
const axios = require("axios");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const pokemons = await getAllPokemons();
    const name = req.query.name;
    if (name) {
      let pokemonName = pokemons.filter(
        (obj) => obj.name.toLowerCase() === name.toLocaleLowerCase()
      );
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

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const pokemonsBd = await getInfoDB();
  const pokeBd = pokemonsBd.find((poke) => poke.id == id);
  if (pokeBd) {
    res.status(202).send(pokeBd);
  } else {
    const pokemons = await getIdPokemon(id);
    res.status(202).send(pokemons);
  }
});

router.post("/", async (req, res) => {
  try {
    await postPokemon(req.body);
    res.status(202).send("Pokemon creado");
  } catch (error) {
    res.status(404).send("Pokemon no creado " + error);
  }
});
module.exports = router;
