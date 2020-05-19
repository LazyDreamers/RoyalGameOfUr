import React from "react";
import "./GameInfo.css";

function GameInfo(props) {
  return (
    <div className="gameInfo">
      <button 
      className= {(props.dice === "null") ? "buttonActive" : "buttonInactive"}
      onClick={props.start}
      >
        START Gry
      </button>

      <div className="infobox">
        <p>Aktualny gracz:</p>
        <p className="infoValue"> {props.player} </p>
      </div>
      <div className="infobox">
        <p>Wynik kostki:</p>
        <p className="infoValue"> {props.dice} </p>
      </div>
    </div>
  );
}
export default GameInfo;
