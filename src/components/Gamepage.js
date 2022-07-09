import React from "react";
import Guesspage from "./Guesspage";
import Memorizepage from "./Memorizpage";

export default function Gamepage(props) {
  return (
    <div className="gamepage">
      <header className="row title__container">
        <div className="container__logo">
          <img
            src={require(`../images/logo.png`)}
            alt="logo"
            className="logo"
          />
        </div>
        <h1>Memory Game</h1>
      </header>
      <main>
        {!props.isReady && (
          <Memorizepage
            pokemonElements={props.pokemonElements}
            handleReadyClick={props.handleReadyClick}
          />
        )}
        {props.isReady && (
          <Guesspage
            randomPokemonElement={props.randomPokemonElement}
            typeChoices={props.typeChoices}
            loadTypeChoices={props.loadTypeChoices}
          />
        )}
      </main>
    </div>
  );
}
