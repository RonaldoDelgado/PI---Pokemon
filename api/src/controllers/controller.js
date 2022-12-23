const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getApiPokemons = async () => {
  const Api = await axios
    .get("https://pokeapi.co/api/v2/pokemon")
    .then((data) => {
      return data.data.results;
    });
  const Api2 = Api.map((url) => {
    return url.url;
  });
  let pokemon = [];
  for (let pokeUrl of Api2) {
    pokemon.push(
      await axios.get(pokeUrl).then((data) => {
        return {
          id: data.data.id,
          nombre: data.data.name,
          health: data.data.stats[0].base_stat,
          attack: data.data.stats[1].base_stat,
          defense: data.data.stats[2].base_stat,
          speed: data.data.stats[5].base_stat,
          height: data.data.height,
          weight: data.data.weight,
        };
      })
    );
  }
  return pokemon;
};

const getInfoDB = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};
const getAllPokemons = async () => {
  const apiInfo = await getApiPokemons();
  const dbInfo = await getInfoDB();
  const infoCompleta = apiInfo.concat(dbInfo);
  return infoCompleta;
};

module.exports = {
  getAllPokemons,
};
