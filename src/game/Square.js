import React from "react";
import "./Square.scss";

const Square = ({ position, value, player, zmiana }) => (
  <button
    className="body"
    onClick={() => {
      console.log({ position, value, player });
      zmiana(position);
    }}
  >
    {player}
  </button>
);

// onClick={() => console.log({position, value, player})}

export default Square;
