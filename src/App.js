import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Pokemon from "./components/Pokemon";
import Gamepage from "./components/Gamepage";
import Homepage from "./components/Homepage";

//Review Stage:  Show All Pokemon's Name and Type - OK
//Start Game - OK
//View Pokemons, Start Button - OK
//Shuffle Pokemons - OK
//Quiz Stage:
// - Ask Pokemon Name
// - Ask Pokemon Type
// - Record Score & High Score

//CSS
//Transition Cards off screen
export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [randomPokemonElement, setRandomPokemonElement] = useState({});
  const [typeChoices, setTypeChoices] = useState([]);
  // const [score, setScore] = useState(0);
  // const [stage, setStage] = useState(0);
  const [question, setQuestion] = useState(0);

  function loadQuestions() {
    setQuestion(() => {
      pokemons.map((pokemon) => {
        return {
          ...pokemon,
          nameChoices: [pokemon.name],
          typeChoices: [...typeChoices, pokemon.types],
        };
      });
    });
  }

  const allPokemonTypes = [
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

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

    const shuffledPokemonArray = shuffle(pokemonArray);

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
      setSelectedPokemons((prevSelectedPokemons) => {
        return [...prevSelectedPokemons, data.species.name];
      });
    }

    for (let i = 0; i < shuffledPokemonArray.length; i++) {
      getPokemon(shuffledPokemonArray[i]);
    }
  }, []);

  const pokemonElements = pokemons.map((pokemon) => {
    return <Pokemon pokemon={pokemon} />;
  });

  function handleStartClick() {
    setIsPlaying(true);
  }

  function handleReadyClick() {
    setIsReady(true);
    selectRandomPokemon();
    loadTypeChoices();
  }

  function selectRandomPokemon() {
    let randonNumber = Math.floor(Math.random() * 10);
    let randomPokemon = pokemonElements[randonNumber];
    setRandomPokemonElement(randomPokemon);
  }

  function loadTypeChoices() {
    setTypeChoices([]);
    const temporaryArray = [];
    for (let i = 0; i < 3; i++) {
      let randomChoice =
        allPokemonTypes[Math.floor(Math.random() * allPokemonTypes.length)];

      while (temporaryArray.includes(randomChoice)) {
        randomChoice =
          allPokemonTypes[Math.floor(Math.random() * allPokemonTypes.length)];
      }
      temporaryArray.push(randomChoice);
      setTypeChoices((prevTypeChoices) => {
        return [...prevTypeChoices, randomChoice];
      });
    }
  }

  return (
    <div className={`App ${isPlaying ? "" : "center__all"}`}>
      {!isPlaying && <Homepage handleStartClick={handleStartClick} />}
      {isPlaying && (
        <Gamepage
          pokemonElements={pokemonElements}
          isReady={isReady}
          handleReadyClick={handleReadyClick}
          randomPokemonElement={randomPokemonElement}
          typeChoices={typeChoices}
          loadTypeChoices={loadTypeChoices}
        />
      )}
    </div>
  );
}
