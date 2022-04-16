import React from "react";
import "../css/Key.css";

function Key(props) {
  return (
    <button
      className={"key-container " + props.classList}
      onClick={props.onClick}
    >
      {props.textContent}
    </button>
  );
}

export default Key;
