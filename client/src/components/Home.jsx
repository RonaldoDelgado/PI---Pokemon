import React from "react";
import "../index.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getTypes,
  filtradoTypos,
  filtradoApiBd,
  ordernarPokemon,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import BarraBusqueda from "./BarraBusqueda";

export default function Home() {
  const dispatch = useDispatch();
  const allType = useSelector((state) => state.type);
  const allPokemons = useSelector((state) => state.pokemon);
  const [orden, setOrden] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [pokemonsPaginado, setPokemonsPaginado] = useState(12);
  const ultimoPokemon = paginaActual * pokemonsPaginado;
  const primerPokemon = ultimoPokemon - pokemonsPaginado;
  const pokemonesActuales = allPokemons.slice(primerPokemon, ultimoPokemon);

  const paginado = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  function handleFiltradoType(e) {
    dispatch(filtradoTypos(e.target.value));
  }

  function handleFiltradoApiBd(e) {
    dispatch(filtradoApiBd(e.target.value));
  }

  function handlerOrdenar(e) {
    e.preventDefault();
    dispatch(ordernarPokemon(e.target.value));
    setPaginaActual(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <Link to="/crear-pokemon">
        <button>CREAR POKEMON</button>
      </Link>
      <h1>Pokemon Henry</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Cargar Pokemones
      </button>
      <select onChange={(e) => handleFiltradoType(e)}>
        <option value="Todos">Todos</option>
        {allType?.map((objType) => {
          return <option value={objType.name}>{objType.name}</option>;
        })}
      </select>

      <select onChange={(e) => handleFiltradoApiBd(e)}>
        <option value="Todos">Todos los pokemones</option>
        <option value="API">Pokemones desde la API</option>
        <option value="BD">Pokemones Base de Datos</option>
      </select>
      <select onChange={(e) => handlerOrdenar(e)}>
        <option value="asc">Acendente</option>
        <option value="desc">Desendente</option>
      </select>
      <select>
        <option value="AttackAsc">Nivel Ataque Acendente</option>
        <option value="AttackDes">Nivel Ataque Desendente</option>
      </select>
      <Paginado
        pokemonsPaginado={pokemonsPaginado}
        allPokemons={allPokemons.length}
        paginado={paginado}
      />
      <BarraBusqueda />
      <div>
        {pokemonesActuales?.map((poke) => {
          return (
            <fragment>
              <Link to={"/home/" + poke.id}>
                <Card
                  name={poke.name}
                  img={poke.img}
                  type={poke.type}
                  key={poke.id}
                />
              </Link>
            </fragment>
          );
        })}
      </div>
    </div>
  );
}
