import React from "react";

const Status = (props) => (
  <h4 className="Status">
    {props.player ? `Now player ${props.player}.` : "Let's begin!"}
  </h4>
);

export default Status;
