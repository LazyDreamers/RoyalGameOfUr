

function MakeDefaultsStore() {
    const update = () => {};
  
    const store = {
      _base: {
        ///
        A: {
          uid: "A",
          value: 2,
          player: "White",
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
          player: "Black",
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
        White: ["A", "B", "C", "D", "E"],
        Black: ["F", "G", "H", "I", "J"]
      },
      _render: [
        ///
        ["A", "B", "C", "D", "E"],
        ["F", "G", "H", "I", "J"]
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