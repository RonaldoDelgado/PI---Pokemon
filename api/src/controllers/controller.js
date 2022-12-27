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
          name: data.data.name,
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

const insertTypes = async () => {
  const Types = await axios
    .get("https://pokeapi.co/api/v2/type/")
    .then((data) => {
      return data.data.results;
    });
  const UrlTypes = Types.map((url) => {
    return url.url;
  });
  let typesPokemons = [];
  for (let url of UrlTypes) {
    typesPokemons.push(
      await axios.get(url).then((datos) => {
        return {
          id: datos.data.id,
          name: datos.data.name,
        };
      })
    );
  }
  for (let i = 0; i < typesPokemons.length; i++) {
    await Type.create(typesPokemons[i]);
  }
};

const getAllTypes = async () => {
  let AllTypes = await Type.findAll();
  if (AllTypes.length) {
    return AllTypes;
  } else {
    await insertTypes();
    AllTypes = await Type.findAll();
  }
  return AllTypes;
};

const postPokemon = async (dataBody) => {
  let { name, health, attack, defense, speed, height, weigth, type } = dataBody;

  let pokemonCreate = await Pokemon.create({
    name,
    health,
    attack,
    defense,
    speed,
    height,
    weigth,
  });

  let typeDb = await Type.findAll({
    where: { name: type },
  });

  pokemonCreate.addType(typeDb);
};

module.exports = {
  getAllPokemons,
  getAllTypes,
  postPokemon,
};
