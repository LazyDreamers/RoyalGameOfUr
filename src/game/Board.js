import React from "react";
import Square from "./Square";
import "./Board.scss";
// import MakeDefaultsSquares from "./STATE.js";

async function Delay(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function MakeDefaultsStore() {
  const update = () => {};

  const store = {
    _base: {
      ///
      A: {
        uid: "A",
        value: 2,
        player: "dawid",
        aktywny: false,
        extra: false,
        update
      },
      B: {
        uid: "B",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      C: {
        uid: "C",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      D: {
        uid: "D",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      E: {
        uid: "E",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      F: {
        uid: "F",
        value: 2,
        player: "damian",
        aktywny: false,
        extra: false,
        update
      },
      G: {
        uid: "G",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      H: {
        uid: "H",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      I: {
        uid: "I",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      J: {
        uid: "J",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      }
    },
    _pathsForPlayers: {
      ///
      dawid: ["A", "B", "C", "D", "E"],
      damian: ["F", "G", "H", "I", "J"]
    },
    _render: [
      ///
      ["A", "B", "C", "D", "E"],
      ["F", "G", "H", "I", "J"]
    ],
    getFirstPlayer() {
      return "dawid";
    },
    getPlayerPath(player) {
      // TODO: Co jak player nie istnieje?
      return this._pathsForPlayers[player].map(uid => {
        return this._base[uid];
      });
    },
    nextPlayer: player => {
      return player === "dawid" ? "damian" : "dawid";
    },
    renderSquares() {
      return this._render
        .map(kolumna => kolumna.map(uid => this._base[uid]))
        .flat();
    },
  
  }
  store.receipt = null;
  return store;
}

///

// const store = MakeDefaultsStore();
// console.debug(`DEBUG:`, store.getPlayerPath("dawid"));

///

class Board extends React.Component {
  
  store =  MakeDefaultsStore()
  state = {
    renderSquares: this.store.renderSquares()
  };

  startGameLoop = async () => {
    const store = this.store;

    let player = store.getFirstPlayer();

    console.log(`START GRY, zaczyna: ${player}`);

    while (true) {
      await Delay(500);

      // początek tury
      console.error(`Teraz player: ${player}`);

      const dice = this.rzucamy_kostką();
      const polaDoAktywacji = this.zwraca_pola_do_aktywacji({
        store,
        dice,
        player
      });

      if (polaDoAktywacji.length === 0) {
        player = store.nextPlayer(player);
        this.koniec_tury();
        continue;
      }

      const pole = await this.czekaj_na_wskazanie_pola(polaDoAktywacji);
      console.log(`czekaj_na_wskazanie_pola zrwóciło: `, pole);

      const targetSquare = this.wykonaj_ruch({ store, pole, dice, player });

      if (this.czy_wygrał_gracz({ store, player })) {
        break;
      }

      if (!targetSquare.extra) {
        player = store.nextPlayer(player);
        console.warn("::WHILE:: sprawdź extra: Zmiana gracza.");
      }

      this.koniec_tury();
    }
    //

    this.koniec_gry(player);
    console.log(`Gra się zakończyła, wygrał player: `, player);
    console.log(this.state.renderSquares)
  };

  rzucamy_kostką = () => {
    const wynikKostki = Math.floor(Math.random() * (4 - 0 + 1) + 0);
    console.log(`wynik kostki:`, wynikKostki);
    return wynikKostki;
    // return 2;
  };

  zwraca_pola_do_aktywacji = ({ store, dice, player }) => {
    const polaDoAktywacji = [];

    const playerPath = store.getPlayerPath(player);

    playerPath.forEach((square, idx, squares) => {
      // TODO: Mona troche uprościć
      if (!square.value <= 0) {
        if (square.player === player) {
          if (idx + dice <= squares.length - 1) {
            const targetSquare = squares[idx + dice];
            if (targetSquare.player !== player) {
              square.aktywny = true;
              polaDoAktywacji.push(square);
            }
          }
        }
      }
    });

    console.log(`zwraca_pola_do_aktywacji: `, polaDoAktywacji);
    return polaDoAktywacji;
  };

  czy_jest_jakiekolwiek_aktywne_pole = player => {
    const tab = this.state.squares;
    const isActive = tab.some(function(el) {
      return el.aktywny === true;
    });
    console.log("Jest aktywne pole", isActive); //true
    return isActive;
  };

  czekaj_na_wskazanie_pola = async pola => {
    console.log(`czekaj_na_wskazanie_pola: AKTYWACJA: `, pola);

    for (const square of pola) {
      square.aktywny = true;
      square.update();
    }

    const pole = await new Promise((resolve, reject) => {
      this.receipt = { resolve, reject };
    });

    for (const square of pola) {
      square.aktywny = false;
      square.update();
    }

    return pole;
  };

  wykonaj_ruch = ({ store, pole, dice, player }) => {
    const playerPath = store.getPlayerPath(player);
    const enemyPath = store.getPlayerPath(store.nextPlayer(player));
    const state = this.state.renderSquares;
    const sourceIndex = playerPath.findIndex(squareOnPath => {
      return squareOnPath.uid === pole.uid;
    });
    const sourceSquare = pole;
    const targetSquare = playerPath[sourceIndex + dice];
    const enemyFirstSquare = enemyPath[0];
    const playerLastSquare = playerPath[playerPath.length - 1];

    console.log("PlayerPath", playerPath);
    console.log("SourceSquare", sourceSquare);
    console.log("sourceIndex", sourceIndex);
    console.log("Target", targetSquare);
    console.log("Enemy", enemyPath);
    console.log("Enemy", enemyFirstSquare);
    console.log("STATE", state);

    if (targetSquare.player === store.nextPlayer()) {
      enemyFirstSquare.value += 1;
    }

    sourceSquare.value -= 1;
    targetSquare.value += 1;
    targetSquare.player = player;

    if (sourceSquare.value === 0) {
      sourceSquare.player = null;
    }

    if (targetSquare.uid === playerLastSquare.uid) {
      targetSquare.player = null;
    }

    sourceSquare.update();
    targetSquare.update();
    enemyFirstSquare.update();

    return targetSquare;
  };

  czy_wygrał_gracz = ({ store, player }) => {
    const playerPath = store.getPlayerPath(player);
    const lastSquare = playerPath[playerPath.length - 1];
    return lastSquare.value === 2 ? true : false;
  };

  koniec_tury = () => {
    console.log(`koniec tury`);
  };

  koniec_gry = () => {
    const squares = this.state.renderSquares

    for (const square of squares) {
      square.value = 0;
      square.player = null;
      square.aktywny = false      
    }
    squares[0].player = "dawid";
    squares[5].player = "damian";
    squares[0].value = 2;
    squares[5].value = 2;

    this.setState({renderSquares: squares})
    console.log(`koniec gry; FUNKCJA, KONIEC GRY`);
    alert("PRZESZEDŁEŚ CAŁA GRĘ!! GRATULUJĘ!!");

    
    
  };

  handleClick = square => {
    if (this.receipt) {
      const potwierdzenie = this.receipt;
      potwierdzenie.resolve(square);
    } else {
      console.error(" !  ojjojoj, brakuje paragonu");
    }
  };

  render() {
    return (
      <>
        <button onClick={this.startGameLoop}>START Gry</button>

        <ul className="board">
          {this.state.renderSquares.map(square => (
            <Square
              key={square.uid}
              {...square}
              square={square}
              zmiana={this.handleClick}
            />
          ))}
        </ul>
      </>
    );
  }
}

export default Board;


