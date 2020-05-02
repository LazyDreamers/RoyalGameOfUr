import React from "react";
import "./Square.scss";

const Square = ({ position, aktywny, value, player, p1id, p2id, zmiana }) => (
  <button
    className={aktywny ? "bodyActive" : "bodyInactive"}
    onClick={() => {
      console.log("Square.js ", { position, value, player });
      zmiana(position, value, player);
    }}
  >
    {p1id} {p2id}
  </button>
);

// onClick={() => console.log({position, value, player})

export default Square;
