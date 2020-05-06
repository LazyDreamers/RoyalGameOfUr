import React from "react";
import "./Square.scss";

const Square = ({ uid, square, aktywny, value, player, zmiana }) => (
  <button
    className={aktywny ? "bodyActive" : "bodyInactive"}
    onClick={() => {
      // console.log("Square.js ", { position, value, player });
      zmiana(square);
    }}
  >
    {value} {player}
  </button>
);

// onClick={() => console.log({position, value, player})

export default Square;
