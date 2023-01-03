import axios from "axios";

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/pokemon/" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getPokemons() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/pokemon", {});
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}
export function getTypes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/type", {});
    return dispatch({
      type: "GET_TYPE",
      payload: json.data,
    });
  };
}
export function postPokemon(payload) {
  return async function (dispatch) {
    const datos = await axios.post("http://localhost:3001/pokemon", payload);
    return datos;
  };
}
export function getNombrePokemon(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/pokemon?name=" + payload
      );
      return dispatch({
        type: "GET_NOMBRE_POKEMON",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function ordernarPokemon(payload) {
  return {
    type: "ORDENAR_POKEMON",
    payload,
  };
}

export function filtradoTypos(payload) {
  return {
    type: "FILTER_TYPE",
    payload,
  };
}

export function filtradoApiBd(payload) {
  return {
    type: "FILTER_APIBD",
    payload,
  };
}
