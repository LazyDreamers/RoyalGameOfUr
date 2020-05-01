import React from "react";
import Square from "./Square";

const squares = [
  { sid: 14, position: 0, value: 7, player: 1, aktywny: false },
  { sid: 13, position: 1, value: 0, player: 0, aktywny: false },
  { sid: 12, position: 2, value: 0, player: 0, aktywny: false },
  { sid: 11, position: 3, value: 0, player: 0, aktywny: false },
  { sid: 21, position: 4, value: 0, player: 0, aktywny: true },
  { sid: 22, position: 5, value: 0, player: 0, aktywny: false },
  { sid: 23, position: 6, value: 0, player: 0, aktywny: true },
  { sid: 24, position: 7, value: 0, player: 0, aktywny: false },
  { sid: 25, position: 8, value: 0, player: 0, aktywny: false },
  { sid: 26, position: 9, value: 0, player: 0, aktywny: false },
  { sid: 27, position: 10, value: 0, player: 0, aktywny: false },
  { sid: 28, position: 11, value: 0, player: 0, aktywny: false },
  { sid: 18, position: 12, value: 0, player: 0, aktywny: false }
];

class Board extends React.Component {
  state = {
    squares: [...squares]
  };
  receipt = {
    resolve: value => {},
    reject: reason => {}
  };

  // moveFn = () => {
  //     console.log(this.state.squares[]);
  //      console.log("cns")
  // }

  startGameLoop = async () => {
    console.log(
      `START GRY :tada:`,
      this.state.squares[0],
      this.state.squares[12]
    );

    //tu zaczynamy gre

    let player = this.pobierz_pierwszego_gracza();

    while (true) {
      // początek tury
      this.reset_stanu_mety_i_startu_i_dezaktywacja_pól();
      const iloscOczek = this.rzucamy_kostką();
      this.sprawdza_dostępne_ruchy_i_aktywuj_pola(iloscOczek);
      const aktywnePola = [];

      if (!this.czy_jest_jakiekolwiek_aktywne_pole()) {
        player = this.next_player(player);
        this.koniec_tury();
        continue;
      }

      const pole = await this.czekaj_na_wskazanie_pola(aktywnePola);

      this.wykonaj_ruch(pole);

      if (this.czy_wygrał_gracz(player)) {
        break;
      }

      if (!this.sprawdz_extra_targetSquare()) {
        player = this.next_player(player);
      }

      this.koniec_tury();
    }
    //
    this.koniec_gry();
    console.log(`Gra się zakończyła, wygrał player: `, player);
  };

  pobierz_pierwszego_gracza = () => {
    console.log(`pobierz pierwszego gracza`);
    return 2;
  };

  reset_stanu_mety_i_startu_i_dezaktywacja_pól = () => {
    const squares = this.state.squares.slice();

    for (let i = 0; i < squares.length; i++) {
      squares[i].aktywny = false;
    }
    squares[0].player = 1;
    squares[0].aktywny = true;
    squares[12].player = 0;

    this.setState({ squares: squares });

    console.log(`reset stanu mety i startu i dezaktywacja pól`);
  };

  rzucamy_kostką = () => {
    console.log(this.state.squares);
    console.log(`rzuca kostką`);
    return 2;
  };

  sprawdza_dostępne_ruchy_i_aktywuj_pola = iloscOczek => {
    const squares = this.state.squares.slice();

    for (let i = 0; i < squares.length; i++) {
      if (!squares[i].value <= 0) {
        if (!squares[i + 2].player === 1) {
          squares[i].aktywny = true;
        }
      }
    }

    this.setState({ squares: squares });
    console.log(
      `sprawdza dostępne ruchy i ustawia aktywne pola, iloscOczek:`,
      iloscOczek
    );
    return [];
  };

  czy_jest_jakiekolwiek_aktywne_pole = () => {
    console.log(`czy jest aktywne pole`);
    return true;
  };

  czekaj_na_wskazanie_pola = async pola => {
    console.log(`czekaj_na_wskazanie_pola`);

    const ppp = new Promise((resolve, reject) => {
      console.log(`włąśnie zrobił się nowy PROMISE`, this);
      this.receipt = { resolve, reject };
    });

    console.log(`ciekawe czy new Promise blokuje kod? hm..`);

    // return pola[0];
    return ppp;
  };

  wykonaj_ruch = pole => {
    console.log(`wykonaj ruch do: `, pole);
  };

  czy_wygrał_gracz = player => {
    console.log(`czy wygrał gracz`);
    return true;
  };

  sprawdz_extra_targetSquare = () => {
    console.log(`sprawdz extra targetSquare`);
    return true;
  };

  koniec_gry = () => {
    console.log(`koniec gry`);
  };

  ///
  checkActive = () => {
    "funkcja sprawdzająca";
  };

  propekFn = (position, value) => {
    const squares = this.state.squares.slice();
    if (value > 0) {
      /// nmn n n
      const sourceSquare = squares[position];
      const targetSquare = squares[position + 1 /*o tutaj mona kostke*/];

      sourceSquare.player = 0;
      targetSquare.player = 1;

      squares[position].value = value - 1;
      squares[position + 1].value = squares[position + 1].value + 1;
      squares[position].player = 0;
      squares[position + 1].player = 1;

      this.setState({ squares: squares });
      console.log(`Board.js did propekFn`, this.state.squares[position]);
      //   console.log(`true 2`);
    } else {
      console.log(`false`, value);
    }

    console.log("DOCZEKAŁ użyto pola numer: ", position);

    if (this.receipt) {
      const potwierdzenie = this.receipt;
      this.receipt = null;
      potwierdzenie.resolve(123456);
    } else {
      console.error(" !  ojjojoj, brakuje paragonu");
    }
  };

  render() {
    return (
      <>
        <button onClick={this.startGameLoop}>START Gry</button>

        <ul className="board-row">
          {this.state.squares.map(item => (
            <Square
              key={item.position}
              {...item}
              zmiana={this.propekFn}
              jestAktywny={this.wykonaj_ruch}
            />
          ))}
        </ul>
      </>
    );
  }
}

export default Board;
