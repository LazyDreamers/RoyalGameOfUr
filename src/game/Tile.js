import React from "react";
import "./Tile.scss";

export default class Tile extends React.Component {
  uuid = undefined;

  constructor(props) {
    super();
    this.uuid = props.uuid ? props.uuid : "???";

    this.onClickAction = this.onClickAction.bind(this);
  }

  description() {
    return `Pole jjjj ${this.uuid}`;
  }

  onClickAction(event) {
    event.preventDefault(); //
    // console.log(`Kliknięto w pole:`, this._uuid);

    console.log(`onClickAction: ${this.description()}`);
    console.debug(`onClickAction:`, this);
  }

  render() {
    return <div onClick={this.onClickAction}>{this.description()}</div>;
  }
}
