import React, { useState } from "react";
import "../css/Tile.css";

function Tile(props) {
  return (
    <div id={props.id} className={"tile-container " + props.classList}>
      {props.text}
    </div>
  );
}

export default Tile;
