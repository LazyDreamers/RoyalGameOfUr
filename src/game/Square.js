import React from "react";
import "./Square.scss";

const Square = ({ position, value, player, zmiana }) => (
  <button
    className="body"
    onClick={() => {
      console.log("Square.js ", { position, value, player });
      zmiana(position, value, player);
    }}
  >
    {value}, {player}
  </button>
);

// onClick={() => console.log({position, value, player})}

export default Square;
