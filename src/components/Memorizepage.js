import React from "react";

export default function Memorizepage(props) {
  return (
    <div className="page__memorize col">
      <div className="container__pokemon row">{props.pokemonElements}</div>
      <button className="button" onClick={props.handleReadyClick}>
        Ready
      </button>
    </div>
  );
}
