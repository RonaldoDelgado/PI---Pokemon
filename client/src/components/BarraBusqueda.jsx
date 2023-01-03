import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNombrePokemon } from "../actions";

export default function BarraBusqueda() {
  const dispach = useDispatch();
  const [nombre, setNombre] = useState("");

  function handlerInputNombre(e) {
    e.preventDefault();
    setNombre(e.target.value);
    console.log(nombre);
  }
  function handlerSubmit(e) {
    e.preventDefault();
    dispach(getNombrePokemon(nombre));
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por nombre"
        onChange={(e) => handlerInputNombre(e)}
      />
      <button type="submit" onClick={handlerSubmit}>
        BUSCAR
      </button>
    </div>
  );
}
