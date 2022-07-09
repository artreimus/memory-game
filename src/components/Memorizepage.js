import React from "react";

export default function Memorizepage(props) {
  return (
    <div className="memorizepage">
      <div className="container__card">{props.pokemonElements}</div>
      <button className="button" onClick={props.handleReadyClick}>
        Ready
      </button>
    </div>
  );
}
