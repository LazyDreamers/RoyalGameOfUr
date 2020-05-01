import React from "react";
import "./Square.scss";

const Square = ({ position, aktywny, value, player, zmiana }) => (
  <button
    className={aktywny ? "bodyActive" : "bodyInactive"}
    onClick={() => {
      console.log("Square.js ", { position, value, player });
      zmiana(position, value, player);
    }}
  >
    {value}, {player}
  </button>
);

// onClick={() => console.log({position, value, player})

export default Square;
