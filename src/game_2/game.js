import React from "react";
import BOARD from "./board";
import GameInfo from "./GameInfo";
import MakeDefaultsStore from "./MakeDefaultsStore";

const store = MakeDefaultsStore();

async function Delay(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

class GAME extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: store,
      squares: store.renderSquares(),
      actPlayer: "gracz",
      actDice: "null"
    };
  }

  /////////////////////////////  Logika gry:

  startGameLoop = async () => {
    const store = this.state.store;

    let player = store.getFirstPlayer();

    console.log(`START GRY, zaczyna: ${player}`);

    while (true) {
        
        await Delay(800);
        // poczÄtek tury
        console.error(`Teraz player: ${player}`);
        
        const dice = this.rzucamy_kostka();
        this.sendGameInfo(player, dice);
      const polaDoAktywacji = this.zwraca_pola_do_aktywacji({
        store,
        dice,
        player,
      });

      if (polaDoAktywacji.length === 0) {
        player = store.nextPlayer(player);
        this.koniec_tury();
        continue;
      }

      const pole = await this.czekaj_na_wskazanie_pola(polaDoAktywacji);
      console.log(`czekaj_na_wskazanie_pola zrwÃ³ciÅo: `, pole);

      const targetSquare = this.wykonaj_ruch({ store, pole, dice, player });

      if (this.czy_wygral_gracz({ store, player })) {
        break;
      }

      if (!targetSquare.extra) {
        player = store.nextPlayer(player);
        console.warn("::WHILE:: sprawdÅº extra: Zmiana gracza.");
      }

      this.koniec_tury();
    }
    //

    this.koniec_gry(player);
    console.log(`Gra siÄÂ zakoÅczyÅa, wygraÅ player: `, player);
    console.log(this.state.squares);
  };

  ////////////////////////////////////////////// RENDER:

  render() {
    const stan = this.state.squares;
    let gracz = this.state.actPlayer;
    const kostka = this.state.actDice;
    console.log("RENDER", gracz);
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
         actDice: dice
        })

  }

  handleClick(square) {
    if (this.receipt) {
      const potwierdzenie = this.receipt;
      potwierdzenie.resolve(square);
    } else {
      console.error(" !  ojjojoj, brakuje paragonu");
    }
    // console.log("klikniÄto w guzik", square.uid);
  }

  rzucamy_kostka = () => {
    const wynikKostki = Math.floor(Math.random() * (4 - 0 + 1) + 0);
    console.log(`wynik kostki:`, wynikKostki);
    return wynikKostki;
    // return 2;
  };

  zwraca_pola_do_aktywacji = ({ store, dice, player }) => {
    const polaDoAktywacji = [];
    const tab = this.state.squares.slice();
    const playerPath = store.getPlayerPath(player);

    playerPath.forEach((square, idx, squares) => {
      // TODO: Mona troche uproÅciÄ
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
    console.log(tab);
    polaDoAktywacji.forEach((square, idx, squares) => {
      tab.forEach((item, index, arr) => {
        if (item.uid === square.uid) {
          item = square;
        }
      });
    });
    console.log(tab);
    this.setState({ squares: tab });
    // this.forceUpdate()

    console.log(`zwraca_pola_do_aktywacji: `, polaDoAktywacji);
    return polaDoAktywacji;
  };

  //   czy_jest_jakiekolwiek_aktywne_pole = (player) => {
  //     const tab = this.state.squares;
  //     const isActive = tab.some(function(el) {
  //       return el.aktywny === true;
  //     });
  //     console.log("Jest aktywne pole", isActive); //true
  //     return isActive;
  //   };

  czekaj_na_wskazanie_pola = async (pola) => {
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
    const state = this.state.squares;
    const sourceIndex = playerPath.findIndex((squareOnPath) => {
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

  czy_wygral_gracz = ({ store, player }) => {
    const playerPath = store.getPlayerPath(player);
    const lastSquare = playerPath[playerPath.length - 1];
    return lastSquare.value === 2 ? true : false;
  };

  koniec_tury = () => {
    console.log(`koniec tury`);
  };

  koniec_gry = () => {
    const squares = this.state.squares;

    for (const square of squares) {
      square.value = 0;
      square.player = null;
      square.aktywny = false;
    }
    squares[0].player = "White";
    squares[5].player = "Black";
    squares[0].value = 2;
    squares[5].value = 2;

    this.setState({ 
        squares: squares,
        actPlayer: "gracz",
        actDice: "null"
     });
    console.log(`koniec gry; FUNKCJA, KONIEC GRY`);
    alert("PRZESZEDÅEÅ CAÅA GRÄ!! GRATULUJÄ!!");
  };
}

export default GAME;
