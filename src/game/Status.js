import React from "react";

const Status = ({ player }) => (
  <h4 className="Status">
    {player ? `Now player ${player}.` : "Let's begin!"}
  </h4>
);

export default Status;
