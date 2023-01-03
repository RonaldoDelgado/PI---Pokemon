import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function LandingPage() {
  return (
    <div className="fondo">
      <h1 className="palabraPokemon">POKEMON API</h1>
      <Link to="home">
        <button className="buttonEntrar">INGRESAR</button>
      </Link>
    </div>
  );
}
