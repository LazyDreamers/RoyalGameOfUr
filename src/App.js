import React from "react";
import "./styles.scss";
// import Board from "./game/Board";
import GAME from "./game_2/game";

// var player = 1;

// // const numbers = [1, 2, 3, 4, 5];
// const numbers = [1, 2];

// const items = numbers.map((numbers) => <Tile uuid={numbers} />);

const App = () => (
  <>
    <div>
      {/* <Board /> */}
      <GAME />
    </div>
  </>
);
export default App;
