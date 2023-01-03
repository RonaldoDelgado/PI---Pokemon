import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../actions";

function validate(input) {
  let error = {};
  let btnEnviar = document.getElementById("botons");
  if (!input.name) {
    error.name = "Se requiere un Nombre";
    btnEnviar.disabled = true;
  } else if (!input.health) {
    error.health = "Inserta un valor";
    btnEnviar.disabled = true;
  } else if (input.health < 10 || input.health > 200) {
    error.health = "Error debes inserta un valor de 10 a 200";
    btnEnviar.disabled = true;
  } else if (!input.attack) {
    error.attack = "Inserta el ataque de 1 a 200";
    btnEnviar.disabled = true;
  } else if (input.attack < 10 || input.attack > 200) {
    error.attack = "Error debes inserta un valor de 10 a 200";
    btnEnviar.disabled = true;
  } else if (!input.defense) {
    error.defense = "Inserta la defansa de 1 a 100";
    btnEnviar.disabled = true;
  } else if (input.defense < 10 || input.defense > 100) {
    error.defense = "Error debes inserta un valor de 10 a 100";
    btnEnviar.disabled = true;
  } else if (!input.speed) {
    error.speed = "Inserta la velocidad de 1 a 200";
    btnEnviar.disabled = true;
  } else if (input.speed < 10 || input.speed > 200) {
    error.speed = "Error debes inserta un valor de 10 a 200";
    btnEnviar.disabled = true;
  } else if (!input.height) {
    error.height = "Inserta la velocidad de 1 a 200";
    btnEnviar.disabled = true;
  } else if (input.height < 10 || input.height > 200) {
    error.height = "Error debes inserta un valor de 10 a 200";
    btnEnviar.disabled = true;
  } else if (!input.weight) {
    error.weight = "Inserta la velocidad de 1 a 1000";
    btnEnviar.disabled = true;
  } else if (input.weight < 10 || input.weight > 1000) {
    error.weight = "Error debes inserta un valor de 10 a 200";
    btnEnviar.disabled = true;
  } else if (!input.type.length) {
    error.type = "Inserta un tipo de pokemon";
    btnEnviar.disabled = true;
  } else if (input.type.length > 4) {
    error.type = "Maximo 4 tipos";
    btnEnviar.disabled = true;
  } else if (!input.img) {
    error.img = "Inserta una imagen";
    btnEnviar.disabled = true;
  } else {
    btnEnviar.disabled = false;
  }
  return error;
}

export default function CrearPokemon() {
  const dispatch = useDispatch();
  const typePokemon = useSelector((state) => state.type);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    health: "",
    img: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    type: [],
  });

  function handlerCreate(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handlerType(e) {
    setInput({
      ...input,
      type: [...input.type, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        type: [...input.type, e.target.value],
      })
    );
  }
  function handlerEliminarType(e) {
    setInput({
      ...input,
      type: input.type.filter((type) => type !== e.target.name),
    });
    setErrors(
      validate({
        ...input,
        type: input.type.filter((type) => type !== e.target.name),
      })
    );
  }

  function handlerSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input));
    alert("Pokemon creado");
    setInput({
      name: "",
      health: "",
      img: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      type: [],
    });
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>volver</button>
      </Link>
      <h1>¡Creá tu Pokeon!</h1>
      <form onSubmit={(e) => handlerSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handlerCreate(e)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Salud:</label>
          <input
            type="number"
            value={input.health}
            name="health"
            onChange={(e) => handlerCreate(e)}
          />
          {errors.health && <p className="error">{errors.health}</p>}
        </div>
        <div>
          <label>Ataque:</label>
          <input
            type="number"
            value={input.attack}
            name="attack"
            onChange={(e) => handlerCreate(e)}
          />
          {errors.attack && <p className="error">{errors.attack}</p>}
        </div>
        <div>
          <label>Defensa:</label>
          <input
            type="number"
            value={input.defense}
            name="defense"
            onChange={(e) => handlerCreate(e)}
          />
          {errors.defense && <p className="error">{errors.defense}</p>}
        </div>
        <div>
          <label>Velocidad:</label>
          <input
            type="number"
            value={input.speed}
            name="speed"
            onChange={(e) => handlerCreate(e)}
          />
          {errors.speed && <p className="error">{errors.speed}</p>}
        </div>
        <div>
          <label>Altura:</label>
          <input
            type="number"
            value={input.height}
            name="height"
            onChange={(e) => handlerCreate(e)}
          />
          {errors.height && <p className="error">{errors.height}</p>}
        </div>
        <div>
          <label>Peso:</label>
          <input
            type="number"
            value={input.weight}
            name="weight"
            onChange={(e) => handlerCreate(e)}
          />
          {errors.weight && <p className="error">{errors.weight}</p>}
        </div>
        <div>
          <label>Tipo Pokemon:</label>
          <select onChange={(e) => handlerType(e)}>
            {typePokemon.map((type) => (
              <option value={type.name}>{type.name} </option>
            ))}
          </select>
          <div>
            {input.type.map((type) => {
              return (
                <button
                  type="button"
                  onClick={(e) => handlerEliminarType(e)}
                  name={type}
                >
                  {type}
                </button>
              );
            })}
            {errors.type && <p className="error">{errors.type}</p>}
          </div>
          <div>
            <label>Imagen</label>
            <input
              type="text"
              name="img"
              value={input.img}
              onChange={(e) => handlerCreate(e)}
            />
            {errors.img && <p className="error">{errors.img}</p>}
          </div>
        </div>
        <button id="botons" type="submit" disabled>
          CREAR POKEMON
        </button>
      </form>
    </div>
  );
}
