import React from "react";
import "./Square.scss";

const Square = ({
  square,
  position,
  aktywny,
  value,
  player,
  p1id,
  p2id,
  zmiana
}) => (
  <button
    className={aktywny ? "bodyActive" : "bodyInactive"}
    onClick={() => {
      console.log("Square.js ", { position, value, player });
      zmiana(square);
    }}
  >
    {p1id} {p2id}
  </button>
);

// onClick={() => console.log({position, value, player})

export default Square;
