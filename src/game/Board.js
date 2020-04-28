import React from "react";
import Square from "./Square";

const initialStateItems = [
  { position: 1, value: 7, player: 2 },
  { position: 2, value: 0, player: 0 },
  { position: 3, value: 0, player: 0 },
  { position: 4, value: 0, player: 0 },
  { position: 5, value: 0, player: 0 },
  { position: 6, value: 0, player: 1 },
  { position: 7, value: 0, player: 2 },
  { position: 8, value: 0, player: 0 },
  { position: 9, value: 0, player: 0 },
  { position: 10, value: 0, player: 2 },
  { position: 11, value: 0, player: 0 },
  { position: 12, value: 0, player: 1 }
];

class Board extends React.Component {
  state = {
    rzeczy: [...initialStateItems]
  };

  propekFn = iiii => {
    console.log("this.state.rzeczy[2].position = ", iiii);
  };

  render() {
    return (
      <ul className="board-row">
        {this.state.rzeczy.map(item => (
          <Square key={item.position} {...item} zmiana={this.propekFn} />
        ))}
      </ul>
    );
  }
}

export default Board;
