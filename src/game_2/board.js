import React from "react";
import SQUARE from "./square";
import "./Board.css";

class BOARD extends React.Component {
  render() {
    const napis = "guzik";
    const stan = this.props.stan;

    return (
      <ul className= "board">
        {/* <h2>"komponent BOARD" </h2> */}

        {stan.map((square) => (
          <SQUARE
            key={square.uid}
            square={square}
            onClick={() => this.props.onClick(square)}
            napis={napis}
          />
        ))}

        {/* <SQUARE onClick= {() => this.props.onClick()} napis= {napis} /> */}
      </ul>
    );
  }
}

export default BOARD;
