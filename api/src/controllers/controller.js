const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getIdPokemon = async (id) => {
  const ApiId = await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((data) => {
      let auxType = data.data.types.map((type) => {
        return type.type.name;
      });
      return {
        id: data.data.id,
        name: data.data.name,
        img: data.data.sprites.other.home.front_default,
        health: data.data.stats[0].base_stat,
        attack: data.data.stats[1].base_stat,
        defense: data.data.stats[2].base_stat,
        speed: data.data.stats[5].base_stat,
        height: data.data.height,
        weight: data.data.weight,
        type: auxType,
      };
    });
  return ApiId;
};

const getApiPokemons = async () => {
  const Api = await axios
    .get("https://pokeapi.co/api/v2/pokemon")
    .then((data) => {
      return {
        pokemons: data.data.results,
        next: data.data.next,
      };
    });

  const Api2 = await axios.get(Api.next).then((data) => {
    return data.data.results;
  });

  const ApiUrl = Api.pokemons.map((url) => {
    return url.url;
  });
  Api2.forEach((url) => {
    ApiUrl.push(url.url);
  });
  let pokemon = [];
  for (let pokeUrl of ApiUrl) {
    pokemon.push(
      await axios.get(pokeUrl).then((data) => {
        let auxType = data.data.types.map((type) => {
          return type.type.name;
        });
        return {
          id: data.data.id,
          name: data.data.name,
          img: data.data.sprites.other.home.front_default,
          health: data.data.stats[0].base_stat,
          attack: data.data.stats[1].base_stat,
          defense: data.data.stats[2].base_stat,
          speed: data.data.stats[5].base_stat,
          height: data.data.height,
          weight: data.data.weight,
          type: auxType,
        };
      })
    );
  }
  return pokemon;
};

const getInfoDB = async () => {
  const dbInfo = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const pokemonsBd = dbInfo.map((data) => {
    let auxType = data.Types.map((type) => {
      return type.name;
    });
    return {
      id: data.id,
      name: data.name,
      img: data.img,
      health: data.health,
      attack: data.attack,
      defense: data.defense,
      speed: data.speed,
      height: data.height,
      weight: data.weight,
      type: auxType,
      createdInDb: true,
    };
  });
  return pokemonsBd;
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
  let { name, health, attack, defense, speed, height, weigth, type, img } =
    dataBody;

  let pokemonCreate = await Pokemon.create({
    name,
    health,
    img,
    attack,
    defense,
    speed,
    height,
    weigth,
  });
  for (let i = 0; i < type.length; i++) {
    let typeDb = await Type.findAll({
      where: { name: type[i] },
    });
    pokemonCreate.addType(typeDb);
  }
};

module.exports = {
  getAllPokemons,
  getAllTypes,
  postPokemon,
  getIdPokemon,
  getInfoDB,
};
