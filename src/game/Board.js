import React from "react";
import Square from "./Square";
import "./Board.scss";

// function MakeDefaultsSquares() {
//   return [
//     {  position: 0, p1id: 2, p2id: null, value: 3, player: 0, aktywny: false, extra: false },
//     {  position: 1, p1id: 1, p2id: null, value: 0, player: 0, aktywny: false, extra: false },
//     {  position: 2, p1id: 0, p2id: null, value: 0, player: 0, aktywny: false, extra: false },
//     {  position: 3, p1id: 9, p2id: null, value: 0, player: 0, aktywny: false, extra: false },
//     {  position: 4, p1id: 8, p2id: null, value: 0, player: 0, aktywny: false, extra: false },
//     {  position: 5, p1id: 3, p2id: 3, value: 0, player: 0, aktywny: false, extra: false },
//     {  position: 6, p1id: 4, p2id: 4, value: 0, player: 0, aktywny: false, extra: false },
//     {  position: 7, p1id: 5, p2id: 5, value: 0, player: 0, aktywny: false, extra: false },
//     {  position: 8, p1id: 6, p2id: 6, value: 0, player: 0, aktywny: false, extra: false },
//     {  position: 9, p1id: 7, p2id: 7, value: 0, player: 0, aktywny: false, extra: false },
//     {  position: 10, p1id: null, p2id: 2, value: 0, player: 0, aktywny: false, extra: false },
//     {  position: 11, p1id: null, p2id: 1, value: 0, player: 0, aktywny: false, extra: false },
//     {  position: 12, p1id: null, p2id: 0, value: 0, player: 0, aktywny: false, extra: false },
//     {  position: 13, p1id: null, p2id: 9, value: 0, player: 0, aktywny: false, extra: false },
//     {  position: 14, p1id: null, p2id: 8, value: 0, player: 0, aktywny: false, extra: false }
//   ];
// }

function MakeDefaultsState() {
  return {
    squares: {
      11: { uid: 11, value: 3, aktywny: false, extra: false },
      12: { uid: 12, value: 0, aktywny: false, extra: false },
      13: { uid: 13, value: 0, aktywny: false, extra: false },
      14: { uid: 14, value: 0, aktywny: false, extra: false },
      15: { uid: 15, value: 0, aktywny: false, extra: false },
      21: { uid: 21, value: 3, aktywny: false, extra: false },
      22: { uid: 22, value: 0, aktywny: false, extra: false },
      23: { uid: 23, value: 0, aktywny: false, extra: false },
      24: { uid: 24, value: 0, aktywny: true, extra: false },
      25: { uid: 25, value: 0, aktywny: false, extra: false }
    },
    sciezki: [
      ///
      [11, 12, 22, 23],
      [21, 22, 12, 13]
    ],
    render: [
      ///
      [11, 12, 13, 14, 15],
      [21, 22, 23, 24, 25]
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
    }
  };
}

//// https://kursjs.pl/kurs/super-podstawy/tablice.php
//const tab = ["Marcin", "Ania", "Agnieszka"];
// for (const el of tab) {
//   console.log(el);
// }

//onst pola = MakeDefaultsSquares();
//
//onst playerCount = pola.scieki.length;
//
//onst currentPlayerIndex = playerCount - 1;
//
//onst sciezkaCurrentPlayera = pola.scieki[currentPlayerIndex];
//onst sciezkaPlayera2 = pola.scieki[1];
//
//onst pierwszePoleGracza1 = pola[sciezkaPlayera1[0]]
//
//unction wyliczNastępnePole(pola, sciezkaCurrentPlayera, aktualnePole, ilośćOczek) {
// // const ścieka2 = [];
// // ścieka2.indexOf
// //ścieka = [11, 12];
// // ilośćOczek = 1
// const indexAktualnegoPolaNaWskazanejŚciece = ścieka.indexOf(aktualnePole.uid);
// const indexNastępnegoPolaNaWskazanejŚciece = indexAktualnegoPolaNaWskazanejŚciece + ilośćOczek;
// const uidNastepnegoPola = ścieka[indexNastępnegoPolaNaWskazanejŚciece];
// const nastepnePole = pola[uidNastepnegoPola];
// return nastepnePole;
//
//
//
//
//
//onst następnePole = wyliczNastępnePole(pola, sciezkaPlayera1, pierwszePoleGracza1, ilośćOczek);
//
//ierwszePoleGracza1.aktywny
//
//unction WonArgument() {
// //??
// const meta = MakeDefaultsSquares();
// return meta[0].value;
//

class Board extends React.Component {
  fullSquares = MakeDefaultsState();

  state = {
    firstPlayer: 1,
    squares: this.fullSquares.orderSquares()
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

      let player = this.state.firstPlayer;
      console.error("THIS PLAYER: ", this.state.firstPlayer);

      function pathFor1() {
        const path1 = [];
        const path = MakeDefaultsSquares();
        for (let i = 0; i < path.length; i++) {
          if (typeof path[i].p1id === "number") {
            path1.push(path[i]);
          }
        }
        const tab1 = path1.sort(function(a, b) {
          return a.p1id - b.p1id;
        });
        return tab1;
      }

      function pathFor2() {
        const path2 = [];
        const path = MakeDefaultsSquares();

        for (let i = 0; i < path.length; i++) {
          if (typeof path[i].p2id === "number") {
            path2.push(path[i]);
          }
        }
        const tab2 = path2.sort(function(a, b) {
          return a.p2id - b.p2id;
        });
        return tab2;
      }

      console.log(pathFor2());

      this.reset_stanu_mety_i_startu_i_dezaktywacja_pól(player);
      const iloscOczek = this.rzucamy_kostką();
      const aktywnePola = this.sprawdza_dostępne_ruchy_i_aktywuj_pola(
        iloscOczek,
        player,
        aktywnePola,
        pathFor1,
        pathFor2
      );

      console.warn(`aktywnePola.length = ${aktywnePola.length}, `, aktywnePola);
      // if (!this.czy_jest_jakiekolwiek_aktywne_pole(iloscOczek)) {
      if (aktywnePola.length === 0) {
        player = this.next_player(player);
        this.koniec_tury();
        continue;
      }

      const pole = await this.czekaj_na_wskazanie_pola(aktywnePola);
      console.warn(`czekaj_na_wskazanie_pola zrwóciło: `, pole);

      this.wykonaj_ruch(pole, iloscOczek, player);

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

  // aktualny_gracz = () => {
  //   console.log(`pobierz pierwszego gracza`);
  //   return 2;
  // };

  next_player = player => {
    alert("Skończyły Ci się ruchy. Zmiana gracza.");
    console.log("NEXT PLAYER");
    let firstPlayer = this.state.firstPlayer;
    if (player === 1) {
      firstPlayer = 2;
    } else {
      firstPlayer = 1;
    }

    this.setState({ firstPlayer: firstPlayer });
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
    const wynikKostki = Math.floor(Math.random() * (4 - 1 + 1) + 1);
    console.log(`wynik kostki:`, wynikKostki);
    return wynikKostki;
  };

  sprawdza_dostępne_ruchy_i_aktywuj_pola = (
    iloscOczek,
    player,
    aktywnePola,
    pathFor1,
    pathFor2,
    pole
  ) => {
    console.log(
      `sprawdza dostępne ruchy i ustawia aktywne pola, iloscOczek:`,
      iloscOczek
    );

    aktywnePola = [];
    //  console.log(path1.length);
    console.log(pathFor1());

    // const tab1 = {path1};
    // const tab2 = {pathFor2};
    // console.log(tab1);
    console.log(pathFor2());

    const squares = this.state.squares.slice();

    //  if (player === 1 ) {squares = path2} else {squares = path1};

    for (let i = 0; i < squares.length; i++) {
      if (!squares[i].value <= 0) {
        if (squares[i].player === player) {
          if ([i + iloscOczek] <= squares.length - 1) {
            if (squares[i + iloscOczek].player !== player) {
              squares[i].aktywny = true;
              aktywnePola.push(squares[i]);
            }
          } else {
            break;
          }
        }
      }
    }

    this.setState({ squares: squares });
    return aktywnePola;
  };

  czy_jest_jakiekolwiek_aktywne_pole = player => {
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

  czekaj_na_wskazanie_pola = async pola => {
    console.log(`czekaj_na_wskazanie_pola: AKTYWACJA: `, pola);

    const pole = await new Promise((resolve, reject) => {
      console.log(`włąśnie zrobił się nowy PROMISE`, this.receipt);
      this.receipt = { resolve, reject };
    });

    return pole;
  };

  wykonaj_ruch = (pole, iloscOczek, player) => {
    const position = pole.position;
    // console.log(`Fn wykonuje ruch z pola: `, position);
    // console.log(`Fn wykonuje ruch o iloscOczek:`, iloscOczek);
    const squares = this.state.squares.slice();
    const sourceSquare = squares[position];
    const targetSquare = squares[position + iloscOczek];

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
    this.reset_stanu_mety_i_startu_i_dezaktywacja_pól(this.player);
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

  handleClick = square => {
    console.log(`handleClick: `, square);
    const position = square.position;
    const value = square.value;
    console.log(`handleClick: value: ${value} position: `, position);

    if (this.receipt) {
      const potwierdzenie = this.receipt;
      potwierdzenie.resolve(square);
    } else {
      console.error(" !  ojjojoj, brakuje paragonu");
    }
  };
  render() {
    // function() {
    //   console.debug(`BEGIN, coś:`, this);
    //   const squares = [];
    //   for (const kolumna of this.render) {
    //     console.debug(`  kolumna:`, kolumna);
    //     for (const uidSquare of kolumna) {
    //       const square = this[uidSquare];
    //       console.debug(`  this[${uidSquare}]: `, square);
    //       squares.push(square);
    //     }
    //   }
    //   console.debug(`END`, squares);
    //   return squares;
    // }

    return (
      <>
        <button onClick={this.startGameLoop}>START Gry</button>

        <ul className="board">
          {this.fullSquares.render.map(kolumna =>
            kolumna
              .map(uidSquare => this.fullSquares.squares[uidSquare])
              .map(square => (
                <Square
                  key={square.uid}
                  {...square}
                  square={square}
                  zmiana={this.handleClick}
                />
              ))
          )}
        </ul>

        <ul className="board">
          {this.state.squares.map(function(square) {
            // console.warn(`  wystrzel: `, square);
            return (
              <Square
                key={square.uid}
                {...square}
                square={square}
                zmiana={this.handleClick}
              />
            );
          })}
        </ul>
      </>
    );
  }
}

export default Board;
