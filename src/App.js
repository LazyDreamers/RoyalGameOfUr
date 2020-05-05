import React from "react";
import Status from "./game/Status";
import Tile from "./game/Tile";
import "./styles.scss";
import Board from "./game/Board";

// var player = 1;

// // const numbers = [1, 2, 3, 4, 5];
// const numbers = [1, 2];

// const items = numbers.map((numbers) => <Tile uuid={numbers} />);

const App = () => (
  <>
    
    <div>
      <Board />
    </div>
  </>
);
export default App;
