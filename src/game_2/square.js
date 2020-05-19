import React from "react";
import "./Square.css";

function SQUARE (props) {
 const square = props.square

    return (
    <button 
    className={props.square.aktywny ? "bodyActive" : "bodyInactive"}
    onClick= {props.onClick} 
    >
        {square.value} <br /> {square.player}
        </button>
        
    )
}



export default SQUARE;