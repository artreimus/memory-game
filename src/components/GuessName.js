import React from "react";

export default function GuessName(props) {
  return (
    <div className="row">
      <div className="memorizepage">{props.randomPokemonElement}</div>;
    </div>
  );
}
