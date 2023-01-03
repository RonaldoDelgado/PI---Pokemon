import React from "react";
import "../index.css";

export default function Paginado({ pokemonsPaginado, allPokemons, paginado }) {
  const numeroPagina = [];

  for (let i = 0; i < Math.ceil(allPokemons / pokemonsPaginado); i++) {
    numeroPagina.push(i + 1);
  }
  return (
    <div>
      <ul className="pagination">
        {numeroPagina &&
          numeroPagina.map((numero) => (
            <li key={numero}>
              <a onClick={() => paginado(numero)}>{numero}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}
