import React from "react";
import Square from "./Square";
import "./Board.scss";

function MakeDefaultsSquares() {
  return [
    {  position: 0, p1id: 2, p2id: null, value: 3, player: 0, aktywny: false, extra: false },
    {  position: 1, p1id: 1, p2id: null, value: 0, player: 0, aktywny: false, extra: false },
    {  position: 2, p1id: 0, p2id: null, value: 0, player: 0, aktywny: false, extra: false },
    {  position: 3, p1id: 9, p2id: null, value: 0, player: 0, aktywny: false, extra: false },
    {  position: 4, p1id: 8, p2id: null, value: 0, player: 0, aktywny: false, extra: false },
    {  position: 5, p1id: 3, p2id: 3, value: 0, player: 0, aktywny: false, extra: false },
    {  position: 6, p1id: 4, p2id: 4, value: 0, player: 0, aktywny: false, extra: false },
    {  position: 7, p1id: 5, p2id: 5, value: 0, player: 0, aktywny: false, extra: false },
    {  position: 8, p1id: 6, p2id: 6, value: 0, player: 0, aktywny: false, extra: false },
    {  position: 9, p1id: 7, p2id: 7, value: 0, player: 0, aktywny: false, extra: false },
    {  position: 10, p1id: null, p2id: 2, value: 0, player: 0, aktywny: false, extra: false },
    {  position: 11, p1id: null, p2id: 1, value: 0, player: 0, aktywny: false, extra: false },
    {  position: 12, p1id: null, p2id: 0, value: 0, player: 0, aktywny: false, extra: false },
    {  position: 13, p1id: null, p2id: 9, value: 0, player: 0, aktywny: false, extra: false },
    {  position: 14, p1id: null, p2id: 8, value: 0, player: 0, aktywny: false, extra: false }
  ];
}

function WonArgument() {
  //??
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
      let player = this.aktualny_gracz();
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

  aktualny_gracz = () => {
    console.log(`pobierz pierwszego gracza`);
    return 2;
  };

  next_player = player => {
    console.log(`Następny gracz:`, 1);
    return 1;
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
    const wynikKostki = Math.floor(Math.random() * (4 - 0 + 1) + 0);
    console.error(`wynik kostki:`, wynikKostki);
    return wynikKostki;
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
    const tab = this.state.squares;
    const isActive = tab.some(function(el) {
      return el.aktywny === true;
    });
    console.log("Jest aktywne pole", isActive); //true
    return true;
  };

  czekaj_na_wskazanie_pola = async pola => {
    console.log(`czekaj_na_wskazanie_pola`);

    const ppp = new Promise((resolve, reject) => {
      console.log(`włąśnie zrobił się nowy PROMISE`, this.receipt);
      this.receipt = { resolve, reject };
    });

    // console.log(`ciekawe czy new Promise blokuje kod? hm..`);

    return ppp;
  };

  wykonaj_ruch = (position, iloscOczek, player) => {
    console.log(`Fn wykonuje ruch z pola: `, position);
    console.log(`Fn wykonuje ruch o iloscOczek:`, iloscOczek);
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
    // console.log("DOCZEKAŁ użyto pola numer: ", position);
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

        <ul className="board">
          {this.state.squares.map(item => (
            <Square key={item.position} {...item} zmiana={this.handleClick} />
          ))}
        </ul>
      </>
    );
  }
}

export default Board;
