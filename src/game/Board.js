import React from "react";
import Square from "./Square";

function MakeDefaultsSquares() {
  return [
    { sid: 14, position: 0, value: 4, player: 0, aktywny: false },
    { sid: 13, position: 1, value: 0, player: 0, aktywny: false },
    { sid: 12, position: 2, value: 0, player: 0, aktywny: false },
    { sid: 11, position: 3, value: 0, player: 0, aktywny: false },
    { sid: 21, position: 4, value: 0, player: 0, aktywny: false },
    { sid: 22, position: 5, value: 0, player: 0, aktywny: false },
    { sid: 23, position: 6, value: 0, player: 0, aktywny: false },
    { sid: 24, position: 7, value: 0, player: 0, aktywny: false },
    { sid: 25, position: 8, value: 0, player: 0, aktywny: false },
    { sid: 26, position: 9, value: 0, player: 0, aktywny: false }
    // { sid: 27, position: 10, value: 0, player: 0, aktywny: false },
    // { sid: 28, position: 11, value: 0, player: 0, aktywny: false },
    // { sid: 18, position: 12, value: 0, player: 0, aktywny: false },
  ];
}

function WonArgument() {
  const meta = MakeDefaultsSquares();
  return meta[0].value;
}

class Board extends React.Component {
  state = {
    squares: MakeDefaultsSquares()
  };
  receipt = {
    resolve: value => {},
    reject: reason => {}
  };

  startGameLoop = async () => {
    console.log(
      `START GRY :tada:`,
      this.state.squares[0],
      this.state.squares[12]
    );

    //tu zaczynamy gre

    while (true) {
      // początek tury
      let player = this.pobierz_pierwszego_gracza();
      this.reset_stanu_mety_i_startu_i_dezaktywacja_pól(player);
      const iloscOczek = this.rzucamy_kostką();
      this.sprawdza_dostępne_ruchy_i_aktywuj_pola(iloscOczek, player);
      const aktywnePola = [];

      if (!this.czy_jest_jakiekolwiek_aktywne_pole(iloscOczek)) {
        player = this.next_player(player);
        this.koniec_tury();
        continue;
      }

      const position = await this.czekaj_na_wskazanie_pola(aktywnePola);

      this.wykonaj_ruch(position, iloscOczek, player);

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
    console.log(`Gra się zakończyła, wygrał player: `, "player");
  };

  pobierz_pierwszego_gracza = () => {
    console.log(`pobierz pierwszego gracza`);
    return 2;
  };

  reset_stanu_mety_i_startu_i_dezaktywacja_pól = player => {
    const squares = this.state.squares.slice();

    for (let i = 0; i < squares.length; i++) {
      squares[i].aktywny = false;
    }
    squares[0].player = player;
    squares[squares.length - 1].player = 0;

    this.setState({ squares: squares });

    console.log(`reset stanu mety i startu i dezaktywacja pól`);
  };

  rzucamy_kostką = () => {
    console.log(this.state.squares);
    console.log(`rzuca kostką`);
    return 3;
  };

  sprawdza_dostępne_ruchy_i_aktywuj_pola = (iloscOczek, player) => {
    console.log(
      `sprawdza dostępne ruchy i ustawia aktywne pola, iloscOczek:`,
      iloscOczek
    );
    const squares = this.state.squares.slice();

    for (let i = 0; i < squares.length; i++) {
      if (!squares[i].value <= 0) {
        if ([i + iloscOczek] <= squares.length) {
          if (squares[i + iloscOczek].player !== player) {
            squares[i].aktywny = true;
            console.log([i + iloscOczek]);
          }
        } else {
          break;
        }
      }
    }

    this.setState({ squares: squares });
    return [];
  };

  czy_jest_jakiekolwiek_aktywne_pole = iloscOczek => {
    console.log(this.state.squares);
    console.log(`czy jest aktywne pole`);
    console.log(`iloscOczek:`, iloscOczek);
    return true;
  };

  czekaj_na_wskazanie_pola = async pola => {
    console.log(`czekaj_na_wskazanie_pola`);

    const ppp = new Promise((resolve, reject) => {
      console.log(`włąśnie zrobił się nowy PROMISE`, this);
      this.receipt = { resolve, reject };
    });

    console.log(`ciekawe czy new Promise blokuje kod? hm..`);
    console.log(`iloscOczek:`, this.iloscOczek);

    // return pola[0];
    return ppp;
  };

  wykonaj_ruch = (position, iloscOczek, player) => {
    console.log(`wykonaj ruch otrzymał: `, position);
    console.log(`Fn wykonaj-ruch: iloscOczek:`, iloscOczek);
    const squares = this.state.squares.slice();
    const sourceSquare = squares[position];
    const targetSquare = squares[position + iloscOczek];

    sourceSquare.player = 0;
    targetSquare.player = player;

    sourceSquare.value = sourceSquare.value - 1;
    targetSquare.value = targetSquare.value + 1;
    sourceSquare.player = 0;
    targetSquare.player = player;
    sourceSquare.aktywny = false;

    this.setState({ squares: squares });
    console.log(`Board.js did wykonaj_ruch`, this.state.squares[position]);
    //   console.log(`true 2`);
    console.log("DOCZEKAŁ użyto pola numer: ", position);
  };

  czy_wygrał_gracz = player => {
    const squares = this.state.squares;
    if (squares[squares.length - 1].value === WonArgument()) {
      return true;
    } else {
      return false;
    }
  };

  sprawdz_extra_targetSquare = () => {
    console.log(`sprawdz extra targetSquare`);
    return true;
  };

  koniec_tury = () => {
    console.log(`koniec tury`);
  };

  koniec_gry = () => {
    console.log(`koniec gry`);
    alert("PRZESZEDŁEŚ CAŁA GRĘ!! GRATULUJĘ!!");
    this.setState({ squares: MakeDefaultsSquares() });
  };

  ///
  checkActive = () => {
    "funkcja sprawdzająca";
  };

  handleClick = (position, value) => {
    if (this.receipt) {
      const potwierdzenie = this.receipt;
      potwierdzenie.resolve(position);
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
            <Square key={item.position} {...item} zmiana={this.handleClick} />
          ))}
        </ul>
      </>
    );
  }
}

export default Board;
