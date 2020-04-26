import React from "react";
import Status from "./game/Status";
import Tile from "./game/Tile";
import "./styles.scss";

var player = 1;

// const numbers = [1, 2, 3, 4, 5];
const numbers = [1, 2];

const items = numbers.map(numbers => <Tile uuid={numbers} />);

const App = () => (
  <div className="App">
    <h1>The royal game of Ur</h1>
    <Status player={player} />
    <div>{items}</div>
  </div>
);
export default App;
