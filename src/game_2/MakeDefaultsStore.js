

function MakeDefaultsStore() {
  const update = () => {};

  const store = {
    _base: {
      ///
      A: {
        uid: "A",
        value: 0,
        player: null,
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
        value: 3,
        player: "White",
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
      },
      K: {
        uid: "K",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      L: {
        uid: "L",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      M: {
        uid: "M",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      N: {
        uid: "N",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      O: {
        uid: "O",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      P: {
        uid: "P",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      R: {
        uid: "R",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      S: {
        uid: "S",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      T: {
        uid: "T",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      U: {
        uid: "U",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      W: {
        uid: "W",
        value: 3,
        player: "Black",
        aktywny: false,
        extra: false,
        update
      },
      X: {
        uid: "X",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      Y: {
        uid: "Y",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      },
      Z: {
        uid: "Z",
        value: 0,
        player: null,
        aktywny: false,
        extra: false,
        update
      }
    },
    _pathsForPlayers: {
      ///
      White: ["E", "D", "C", "B", "A", "I", "J", "K", "L", "M", "N", "O", "P", "H", "G", "F"],
      Black: ["W", "U", "T", "S", "R", "I", "J", "K", "L", "M", "N", "O", "P", "Z", "Y", "X"]
    },
    _render: [
      ///
      ["A", "B", "C", "D", "E", "F", "G", "H"],
      ["I", "J", "K", "L", "M", "N", "O", "P"],
      ["R", "S", "T", "U", "W", "X", "Y", "Z"]
    ],
    
    getFirstPlayer() {
      return "White";
    },
    getPlayerPath(player) {
      // TODO: Co jak player nie istnieje?
      return this._pathsForPlayers[player].map(uid => {
        return this._base[uid];
      });
    },
    nextPlayer: player => {
      return player === "White" ? "Black" : "White";
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


export default MakeDefaultsStore;