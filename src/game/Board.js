import React from "react";
import Square from "./Square";
import "./Board.scss";
// import MakeDefaultsSquares from "./STATE.js";

function MakeDefaultsState() {
  return {
    squares: {
      0: { uid: 0, value: 0, player: 0, aktywny: false, extra: false },
      1: { uid: 1, value: 0, player: 0, aktywny: false, extra: false },
      2: { uid: 2, value: 2, player: 1, aktywny: false, extra: false },
      3: { uid: 3, value: 0, player: 0, aktywny: false, extra: false },
      4: { uid: 4, value: 0, player: 0, aktywny: false, extra: false },
      5: { uid: 5, value: 0, player: 0, aktywny: false, extra: false },
      6: { uid: 6, value: 0, player: 0, aktywny: false, extra: false },
      7: { uid: 7, value: 0, player: 0, aktywny: false, extra: false },
      8: { uid: 8, value: 0, player: 0, aktywny: false, extra: false },
      9: { uid: 9, value: 0, player: 0, aktywny: false, extra: false },
      10: { uid: 10, value: 0, player: 0, aktywny: false, extra: false },
      11: { uid: 11, value: 0, player: 0, aktywny: false, extra: false },
      12: { uid: 12, value: 2, player: 2, aktywny: false, extra: false },
      13: { uid: 13, value: 0, player: 0, aktywny: false, extra: false },
      14: { uid: 14, value: 0, player: 0, aktywny: false, extra: false },
    },
    paths: [
      [2, 1, 0, 5, 6, 7, 8, 9, 4, 3],
      [12, 11, 10, 5, 6, 7, 8, 9, 14, 13],
    ],
    render: [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
    ],
    orderSquares() {
      console.debug(`BEGIN, coś:`, this);
      const squares = [];
      for (const kolumna of this.render) {
        console.debug(`  kolumna:`, kolumna);
        for (const uidSquare of kolumna) {
          const square = this.squares[uidSquare];
          console.debug(`  this.squares[${uidSquare}]: `, square);
          squares.push(square);
        }
      }
      console.debug(`END`, squares);
      return squares;
    },
  };
}

class Board extends React.Component {
  fullSquares = MakeDefaultsState();
  state = {
    firstPlayer: 1,
    squares: this.fullSquares.orderSquares(),
  };
  receipt = {
    resolve: (value) => {},
    reject: (reason) => {},
  };

  startGameLoop = async () => {
    const fullSquaresState = this.state.squares;

    console.log(
      `START GRY :tada:`,
      fullSquaresState[2].value,
      fullSquaresState
    );

    let player = 1;
    let aktywnePola = [];
    //tu zaczynamy gre

    // this.state.squares.forEach(() => {
    //   console.log('square')})

    while (true) {
      // początek tury
      console.error("THIS PLAYER: ", player);
      this.reset_stanu_mety_i_startu_i_dezaktywacja_pól(
        player,
        fullSquaresState
      );
      const iloscOczek = this.rzucamy_kostką();
      aktywnePola = this.sprawdza_dostępne_ruchy_i_aktywuj_pola(
        iloscOczek,
        player,
        aktywnePola,
        fullSquaresState
      );
      // if (!this.czy_jest_jakiekolwiek_aktywne_pole(iloscOczek)) {
      if (aktywnePola.length === 0) {
        player = this.change_player(player);
        alert("Skończyły Ci się ruchy. Zmiana gracza.");
        this.koniec_tury();
        continue;
      }

      const pole = await this.czekaj_na_wskazanie_pola(aktywnePola);
      console.log(`czekaj_na_wskazanie_pola zrwóciło: `, pole);

      this.wykonaj_ruch(pole, iloscOczek, player, fullSquaresState);

      if (this.czy_wygrał_gracz(player)) {
        this.reset_stanu_mety_i_startu_i_dezaktywacja_pól(
          player,
          fullSquaresState
        );
        break;
      }

      if (!this.sprawdz_extra_targetSquare()) {
        player = this.change_player(player);
        alert("Skończyły Ci się ruchy. Zmiana gracza.");
      }

      this.koniec_tury();
    }
    //

    this.koniec_gry();
    console.log(`Gra się zakończyła, wygrał player: `, "player");
  };

  // aktualny_gracz = () => {
  //   console.log(`pobierz pierwszego gracza`);
  //   return 2;
  // };

  change_player = (player) => {
    console.log("change PLAYER");
    if (player === 1) {
      return 2;
    } else {
      return 1;
    }
  };

  reset_stanu_mety_i_startu_i_dezaktywacja_pól = (player, fullSquaresState) => {
    const squares = fullSquaresState;

    for (let i = 0; i < squares.length; i++) {
      squares[i].aktywny = false;
    }
    squares[2].player = 1;
    squares[12].player = 2;
    squares[3].player = 0;
    squares[13].player = 0;

    this.setState({ squares: squares });

    console.log(`reset stanu mety i startu i dezaktywacja pól`);
  };

  rzucamy_kostką = () => {
    const wynikKostki = Math.floor(Math.random() * (4 - 1 + 1) + 1);
    console.warn(`wynik kostki:`, wynikKostki);
    return wynikKostki;
  };

  currentPlayerPath = (player) => this.fullSquares.paths[player - 1];

  sprawdza_dostępne_ruchy_i_aktywuj_pola = (
    iloscOczek,
    player,
    aktywnePola,
    fullSquaresState
  ) => {
    aktywnePola = [];

    const squares = fullSquaresState;

    const path = this.currentPlayerPath(player);

    for (let i = 0; i < path.length; i++) {
      if (!squares[path[i]].value <= 0) {
        if (squares[path[i]].player === player) {
          if (i + iloscOczek <= path.length - 1) {
            if (squares[path[i + iloscOczek]].player !== player) {
              squares[path[i]].aktywny = true;

              aktywnePola.push(squares[path[i]]);
            }
          } else {
            break;
          }
        }
      }
    }
    console.log(aktywnePola);
    this.setState({ squares: squares });
    return aktywnePola;
  };

  czy_jest_jakiekolwiek_aktywne_pole = (player) => {
    // if (player === 1) {
    //   p1id
    // } else {
    //   p2id
    // }
    const tab = this.state.squares;
    const isActive = tab.some(function(el) {
      return el.aktywny === true;
    });
    console.log("Jest aktywne pole", isActive); //true
    return isActive;
  };

  czekaj_na_wskazanie_pola = async (pola) => {
    console.log(`czekaj_na_wskazanie_pola: AKTYWACJA: `, pola);

    const pole = await new Promise((resolve, reject) => {
      console.log(`włąśnie zrobił się nowy PROMISE`, this.receipt);
      this.receipt = { resolve, reject };
    });

    return pole;
  };

  wykonaj_ruch = (pole, iloscOczek, player, fullSquaresState) => {
    // console.warn(pole.uid);
    // console.warn(pole);
    const position = pole.uid;

    const squares = fullSquaresState;
    const path = this.currentPlayerPath(player);
    const index = path.findIndex((el) => {
      return el === position;
    });
    const pathIndex = path[index];

    const enemyPlayerPath = this.currentPlayerPath(this.change_player(player));

    console.log(
      "player",
      squares[path[0]],
      "VS enemy",
      squares[enemyPlayerPath[0]]
    );

    console.log(path);
    console.log(pathIndex);

    const sourceSquare = squares[pathIndex];
    console.log(sourceSquare);
    const targetSquare = squares[path[index + iloscOczek]];
    let enemyValue = squares[enemyPlayerPath[0]].value;
    console.warn(enemyValue);

    if (targetSquare.player !== 0) {
      sourceSquare.value = sourceSquare.value - 1;
      squares[enemyPlayerPath[0]].value = squares[enemyPlayerPath[0]].value + 1;
      sourceSquare.player = 0;
      targetSquare.player = player;
    } else {
      sourceSquare.value = sourceSquare.value - 1;
      targetSquare.value = targetSquare.value + 1;
      sourceSquare.player = 0;
      targetSquare.player = player;
    }

    console.log(
      "player",
      squares[path[0]],
      "VS enemy",
      squares[enemyPlayerPath[0]]
    );

    this.setState({ squares: squares });
    // console.log("DOCZEKAŁ użyto pola numer: ", position);
  };

  czy_wygrał_gracz = (player) => {
    const squares = this.state.squares;
    if ((squares[3].value === 2) || (squares[13].value === 2)) {
      return true;
    } else {
      return false;
    }
  };

  sprawdz_extra_targetSquare = () => {
    console.log(`sprawdz extra targetSquare`);
    return false;
  };

  koniec_tury = () => {
    console.log(`koniec tury`);
  };

  koniec_gry = () => {
    console.log(`koniec gry`);
    alert("PRZESZEDŁEŚ CAŁA GRĘ!! GRATULUJĘ!!");
    this.setState({ squares: MakeDefaultsState().orderSquares() });
  };

  ///
  checkActive = () => {
    "funkcja sprawdzająca";
  };

  handleClick = (square) => {
    // console.log(`handleClick: `, square);
    // const uid = square.uid;
    // const value = square.value;
    // console.log(`handleClick: value: ${value} position: `, uid);

    if (this.receipt) {
      const potwierdzenie = this.receipt;
      potwierdzenie.resolve(square);
    } else {
      console.error(" !  ojjojoj, brakuje paragonu");
    }
  };
  showPlayer = (player) => {
    return player;
  };
  render() {
    return (
      <>
        <button onClick={this.startGameLoop}>START Gry</button>

        <ul className="board">
          {this.fullSquares.render.map((kolumna) =>
            kolumna
              .map((uidSquare) => this.fullSquares.squares[uidSquare])
              .map((square) => (
                <Square
                  key={square.uid}
                  {...square}
                  square={square}
                  zmiana={this.handleClick}
                />
              ))
          )}
        </ul>
      </>
    );
  }
}

export default Board;
