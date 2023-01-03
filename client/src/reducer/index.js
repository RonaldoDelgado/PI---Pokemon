const initialState = {
  pokemon: [],
  pokemonsBackUp: [],
  detailt: [],
  type: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemon: action.payload,
        pokemonsBackUp: action.payload,
      };
    case "GET_TYPE":
      return {
        ...state,
        type: action.payload,
      };
    case "FILTER_TYPE":
      const allPokemons = state.pokemonsBackUp;
      const filtrado =
        action.payload === "Todos"
          ? allPokemons
          : allPokemons.filter((objPoke) =>
              objPoke.type.includes(action.payload)
            );
      return {
        ...state,
        pokemon: filtrado,
      };
    case "FILTER_APIBD":
      let filtradoApiDb;
      if (action.payload === "Todos") {
        filtradoApiDb = state.pokemonsBackUp;
      } else {
        filtradoApiDb =
          action.payload === "BD"
            ? state.pokemonsBackUp.filter((objPoke) => objPoke.createdInDb)
            : state.pokemonsBackUp.filter((objPoke) => !objPoke.createdInDb);
      }
      return {
        ...state,
        pokemon: filtradoApiDb,
      };
    case "ORDENAR_POKEMON":
      let orden =
        action.payload === "asc"
          ? state.pokemon.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
              return 0;
            })
          : state.pokemon.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
              return 0;
            });
      return {
        ...state,
        pokemon: orden,
      };
    case "GET_NOMBRE_POKEMON":
      return {
        ...state,
        pokemon: action.payload,
      };
    case "POST_POKEMOJ":
      return {
        ...state,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detailt: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
