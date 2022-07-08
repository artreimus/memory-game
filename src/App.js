import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Pokemon from "./components/Pokemon";

//Review Stage:  Show All Pokemon's Name and Type
//Start Game
//Shuffle Pokemons
//Quiz Stage:
// - Ask Pokemon Name
// - Ask Pokemon Type
// - Record Score & High Score

//CSS
//Transition Cards off screen
export default function App() {
  const [pokemons, setPokemons] = useState([]);
  // const [score, setScore] = useState(0);
  // const [stage, setStage] = useState(0);

  useEffect(() => {
    const pokemonArray = [
      "charmander",
      "squirtle",
      "wartortle",
      "pikachu",
      "machamp",
      "graveler",
      "mew",
      "dragonite",
      "rattata",
      "butterfree",
    ];

    async function getPokemon(pokemon) {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
        { mode: "cors" }
      );
      const data = await response.json();
      setPokemons((prevPokemons) => {
        return [
          ...prevPokemons,
          {
            id: nanoid(),
            name: data.species.name,
            types: {
              mainType: data.types[0].type.name,
              secondaryType:
                data.types.length > 1 ? data.types[1].type.name : null,
            },
          },
        ];
      });
    }

    for (let i = 0; i < pokemonArray.length; i++) {
      getPokemon(pokemonArray[i]);
    }
  }, []);

  const pokemonElements = pokemons.map((pokemon) => {
    return <Pokemon pokemon={pokemon} />;
  });

  console.log(pokemons);

  return (
    <div className="App">
      <header className="row">
        <div className="container__logo">
          <img src={require(`./images/logo.png`)} alt="logo" className="logo" />
        </div>
        <h1>Memory Game</h1>
      </header>
      <main>
        <div className="container__card">{pokemonElements}</div>
      </main>
    </div>
  );
}
