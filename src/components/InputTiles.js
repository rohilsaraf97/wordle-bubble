import React, { useState } from "react";
import "../css/InputTiles.css";
import Tile from "./Tile";

function InputTiles(props) {
  let guessRows = props.data;

  return (
    <div className="input-tiles-container">
      {guessRows.map((guessRow, guessRowIndex) => (
        <div
          key={"guessRow-" + guessRowIndex}
          id={"guessRow-" + guessRowIndex}
          className="input-tiles-row"
        >
          {guessRow.map((tile, tileIndex) => (
            <Tile
              classList={guessRow[tileIndex].classList}
              text={guessRow[tileIndex].letter}
              id={"guessRow-" + guessRowIndex + "-tile-" + tileIndex}
              key={"guessRow-" + guessRowIndex + "-tile-" + tileIndex}
            ></Tile>
          ))}
        </div>
      ))}
    </div>
  );
}

export default InputTiles;
