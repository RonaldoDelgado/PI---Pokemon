import React from "react";

export default function pokemonCard({ name, img, type }) {
  return (
    <div className="pokemon">
      <h3>{name}</h3>
      <img src={img} alt="img not found" width="200px" height="250px" />
      <label>TIPO:</label>
      <div>
        {type?.map((type) => (
          <h5>{type + " "}</h5>
        ))}
      </div>
    </div>
  );
}
