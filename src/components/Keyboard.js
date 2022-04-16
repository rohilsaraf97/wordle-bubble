import React, { useState } from "react";
import "../css/Keyboard.css";
import Key from "./Key";
import { keys } from "../constants";

function Keyboard(props) {
  return (
    <div className="keyboard-container">
      {keys.map((key, index) => {
        return (
          <Key
            classList={
              key in props.colorClassList ? props.colorClassList[key] : ""
            }
            key={index}
            textContent={key}
            onClick={() => props.onClick(key)}
          />
        );
      })}
    </div>
  );
}

export default Keyboard;
