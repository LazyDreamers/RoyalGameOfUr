import React from "react";
import "./Square.scss";

// const Square = ({ uid, square, aktywny, value, player, zmiana }) => (
//   <button
//     className={aktywny ? "bodyActive" : "bodyInactive"}
//     onClick={() => {
//       zmiana(square);
//     }}
//   >
//     {value} {player}
//   </button>
// );

// const Square = ({ uid, square, aktywny, value, player, zmiana }) => ;
class Square extends React.Component {
  state = null; // square

  constructor(props) {
    super();
    this.onClickAction = this.onClickAction.bind(this);
    this.update = this.update.bind(this);
    this.square = props.square;
    this.zmiana = props.zmiana;
    this.square.update = this.update;
  }

  update() {
    this.setState(this.square);
  }

  onClickAction(event) {
    event.preventDefault();
    this.zmiana(this.square);
  }

  render() {
    return (
      <button
        className={this.square.aktywny ? "bodyActive" : "bodyInactive"}
        onClick={this.onClickAction}
      >
        {this.square.value} <br /> {this.square.player}
      </button>
    );
  }
}

export default Square;
