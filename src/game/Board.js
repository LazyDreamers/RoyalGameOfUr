import React from "react";
import Square from "./Square";
import "./Board.scss";
// import MakeDefaultsSquares from "./STATE.js";

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
        value: 2,
        player: "damian",
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
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      }
    },
    _pathsForPlayers: {
      ///
      dawid: ["A", "B", "E", "F"],
      damian: ["D", "E", "B", "C"]
    },
    _render: [
      ///
      ["A", "B", "C"],
      ["D", "E", "F"]
    ],
    receipt: {
      resolve: value => {},
      reject: reason => {}
    },
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
    }
  };
  store.receipt = null;
  return store;
}

///

// const store = MakeDefaultsStore();
// console.debug(`DEBUG:`, store.getPlayerPath("dawid"));

///

class Board extends React.Component {
  store = MakeDefaultsStore();
  state = {
    renderSquares: this.store.renderSquares()
  };

  startGameLoop = async () => {
    const store = this.store;

    let player = store.getFirstPlayer();

    console.log(`START GRY, zaczyna: ${player}`);

    while (true) {
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
  };

  rzucamy_kostką = () => {
    const wynikKostki = Math.floor(Math.random() * (4 - 0 + 1) + 0);
    console.log(`wynik kostki:`, wynikKostki);
    return wynikKostki;
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
      console.log(`włąśnie zrobił się nowy PROMISE`, this.receipt);
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
    const sourceIndex = playerPath.findIndex(el => {
      return el === pole.uid;
    });
    const sourceSquare = pole;
    const targetSquare = playerPath[sourceIndex + dice];

    const enemyOnTargetSquare =
      targetSquare.player !== player && targetSquare.value > 0;

    if (enemyOnTargetSquare) {
      // TODO: Handle multiple peons on single square
      const enemyFirstSquare = store.getPlayerPath(store.nextPlayer(player))[0];
      enemyFirstSquare.value += targetSquare.value;
      targetSquare.player = null;
      targetSquare.value = 0;
    }

    sourceSquare.value -= 1;
    targetSquare.player = player;
    targetSquare.value += 1;

    if (sourceSquare.value === 0) {
      sourceSquare.player = null;
    }

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
