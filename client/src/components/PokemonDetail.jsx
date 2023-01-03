import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myPokemon = useSelector((state) => state.detailt);

  return (
    <div>
      {myPokemon ? (
        <div>
          <h1>{myPokemon.name}</h1>
          <img src={myPokemon.img} />
          <h2>Salud: {myPokemon.health}</h2>
          <h2>Ataque: {myPokemon.attack}</h2>
          <h2>Defensa: {myPokemon.defense}</h2>
          <h2>Velocidad: {myPokemon.speed}</h2>
          <h2>Altura: {myPokemon.height}</h2>
          <h2>Peso: {myPokemon.weight}</h2>
          <div>
            {myPokemon.type?.map((objType, indx) => {
              return <label key={indx}>{objType}</label>;
            })}
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
}
