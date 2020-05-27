import React from "react";
import BOARD from "./board";
import GameInfo from "./GameInfo";
import MakeDefaultsStore from "./MakeDefaultsStore";

async function Delay(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

class GAME extends React.Component {
  constructor(props) {
    super(props);
    //const store = MakeDefaultsStore();
    this.state = {
      squares: [], // store.renderSquares(),
      activeSquares: [],
      actPlayer: "gracz",
      actDice: "null",
    };
  }

  /////////////////////////////  Logika gry:

  startGameLoop = async () => {
    // const store = this.state.store;
    const store = MakeDefaultsStore();
    let player = store.getFirstPlayer();
    let squares = store.renderSquares();
    this.setState({
      squares: squares,
    });

    // console.log(`START GRY, zaczyna: ${player}`);

    while (true) {
      await Delay(800);
      const dice = this.roll_dice();
      const playerPath = store.getPlayerPath(player);
      this.setState({
        actDice: dice,
        actPlayer: player,
      });

      const activeSquares = this.zwraca_pola_do_aktywacji({
        playerPath,
        dice,
        player,
      });

      this.setState({ activeSquares: activeSquares });

      if (activeSquares.length === 0) {
        player = store.nextPlayer(player);
        this.koniec_tury();
        continue;
      }

      const sourceSquare = await this.czekaj_na_wskazanie_pola(activeSquares);
      // console.log(`czekaj_na_wskazanie_pola zrwóciło: `, sourceSquare);
      console.log("AKTYWNE POLA: ", this.state.activeSquares);
      const makeMove = this.wykonaj_ruch({
        store,
        squares,
        playerPath,
        sourceSquare,
        dice,
        player,
      });
      this.setState({ squares: makeMove, activeSquares: [] });
      console.warn(this.state.squares)
      if (this.czy_wygral_gracz({ playerPath })) {
        break;
      }
      const targetSquare = false;
      if (!targetSquare.extra) {
        player = store.nextPlayer(player);
        console.warn("::WHILE:: sprawdź extra: Zmiana gracza.");
      }

      this.koniec_tury();
    }
    //

    this.koniec_gry(squares);
    this.setState({
      actDice: "null",
      actPlayer: player,
    });
    // console.log(`Gra się zakończyła, wygrał player: `, player);
    // console.log(this.state.squares);
  };

  ////////////////////////////////////////////// RENDER:

  render() {
    const stan = this.state.squares;
    let gracz = this.state.actPlayer;
    const kostka = this.state.actDice;
    // console.log("RENDER", gracz);
    return (
      <>
        <h1>"Game Of Ur"</h1>

        <GameInfo start={this.startGameLoop} player={gracz} dice={kostka} />

        <BOARD stan={stan} onClick={(square) => this.handleClick(square)} />
      </>
    );
  }

  ///////////////////////////////////////////// Funkcje pomocnicze:

  sendGameInfo(player, dice) {
    const gracz = player;
    this.setState({
      actPlayer: gracz,
      actDice: dice,
    });

    setTimeout(() => {
      console.log(this.state);
    }, 100);
  }

  handleClick(square) {
    if (this.receipt) {
      const potwierdzenie = this.receipt;
      potwierdzenie.resolve(square);
    } else {
      console.error(" !  ojjojoj, brakuje paragonu");
    }
    // console.log("kliknięto w guzik", square.uid);
  }

  roll_dice = () => {
    const wynikKostki = Math.floor(Math.random() * (15 - 0 + 1) + 0);
    console.log(`wynik kostki:`, wynikKostki);
    if (wynikKostki === 0) {
      return 0;
    } else if (wynikKostki >= 1 && wynikKostki <= 4) {
      return 1;
    } else if (wynikKostki >= 5 && wynikKostki <= 10) {
      return 2;
    } else if (wynikKostki >= 11 && wynikKostki <= 14) {
      return 3;
    } else if (wynikKostki === 15) {
      return 4;
    }

    // return 2;
  };

  zwraca_pola_do_aktywacji = ({ playerPath, dice, player }) => {
    const activeSquares = [];

    playerPath.forEach((square, idx, squares) => {
      // TODO: Mona troche uprościć
      if (!square.value <= 0) {
        if (square.player === player) {
          if (idx + dice <= squares.length - 1) {
            const targetSquare = squares[idx + dice];
            if (targetSquare.player !== player) {
              square.aktywny = true;
              activeSquares.push(square.uid);
            }
          }
        }
      }
    });

    return activeSquares;
  };

  //   czy_jest_jakiekolwiek_aktywne_sourceSquare = (player) => {
  //     const tab = this.state.squares;
  //     const isActive = tab.some(function(el) {
  //       return el.aktywny === true;
  //     });
  //     console.log("Jest aktywne sourceSquare", isActive); //true
  //     return isActive;
  //   };

  czekaj_na_wskazanie_pola = async (activeSquares) => {
    // console.log(`czekaj_na_wskazanie_pola: AKTYWACJA: `, activeSquares);

    // for (const square of activeSquares) {
    //   square.aktywny = true;
    // }

    const sourceSquare = await new Promise((resolve, reject) => {
      this.receipt = { resolve, reject };
    });

    // for (const square of activeSquares) {
    //   square.aktywny = false;
    // }

    return sourceSquare;
  };

  przetestuj_wykonaj_ruch = () => {
    // // CASE 1
    // const store = MakeDefaultsStore();
    // const dice = 2;
    // const sourceSquare = 1;
    // const player = "White";
    // this.wykonaj_ruch({store, sourceSquare, dice, player});
    // https://www.youtube.com/watch?v=IJzRPTSfXHY
    // // if (efbfglkbndfiuhvdfj === ["A" , "B"]
  };

  wykonaj_ruch = ({ store, squares, playerPath, sourceSquare, dice, player }) => {
    // const playerPath = store.getPlayerPath(player);
    console.log("STATE first", squares);

    const squaresX = squares.slice();
    const enemyPlayer = store.nextPlayer(player);
    const enemyPath = store.getPlayerPath(enemyPlayer);
    const sourceIndex = playerPath.findIndex((squareOnPath) => { return squareOnPath.uid === sourceSquare.uid });
    const targetOnPath = playerPath[sourceIndex + dice];
    const enemyFirstSquare = enemyPath[0];
    const playerLastSquare = playerPath[playerPath.length - 1];

    const enemyOnState = squaresX.findIndex((squareOnState) => { return squareOnState.uid === enemyFirstSquare.uid });
    const firstOnState = squaresX.findIndex((squareOnState) => { return squareOnState.uid === playerPath[0].uid });

    const lastOnState = squaresX.findIndex((squareOnState) => { return squareOnState.uid === playerLastSquare.uid });
    const sourceOnState = squaresX.findIndex((squareOnState) => { return squareOnState.uid === sourceSquare.uid });  
    const targetOnState = squaresX.findIndex((squareOnState) => { return squareOnState.uid === targetOnPath.uid });

    console.log("OS   player FIRST index: ", firstOnState);

    console.log("OS   player last index: ", lastOnState);
    console.log("OS   Enemy first index: ", enemyOnState);
    console.log("OS source square index: ", sourceOnState)
    console.log("OS target square index: ", targetOnState)

    if (squaresX[targetOnState].player === enemyPlayer) {
      squaresX[targetOnState].value -= 1;
      squaresX[enemyOnState].value += 1;
    }

    squaresX[sourceOnState].value -= 1;
    squaresX[sourceOnState].player = null;

    squaresX[targetOnState].value += 1;
    squaresX[targetOnState].player = player;

    squaresX[lastOnState].player = null;
    squaresX[firstOnState].player = player;

    squaresX.forEach(square => {square.aktywny = false})

    return squaresX;
  };

  czy_wygral_gracz = ({ playerPath }) => {
    const lastSquare = playerPath[playerPath.length - 1];
    return lastSquare.value === 3 ? true : false;
  };

  koniec_tury = () => {
    console.log(`koniec tury`);
  };

  koniec_gry = (squares) => {
    // const squares = this.state.squares;

    // for (const square of squares) {
    //   square.value = 0;
    //   square.player = null;
    //   square.aktywny = false;
    // }
    // squares[0].player = "White";
    // squares[5].player = "Black";
    // squares[0].value = 2;
    // squares[5].value = 2;

    // this.setState({
    //   squares: squares,
    //   actPlayer: "gracz",
    //   actDice: "null",
    // });
    console.log(`koniec gry; FUNKCJA, KONIEC GRY`);
    alert("PRZESZEDŁEŚ CAŁA GRĘ!! GRATULUJĘ!!");
  };
}

export default GAME;
