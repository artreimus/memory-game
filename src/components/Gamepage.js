import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Guesspage from "./Guesspage";
import Memorizepage from "./Memorizepage";
import Pokemon from "./Pokemon";

export default function Gamepage(props) {
  // Game States
  const [isReady, setIsReady] = useState(false);
  const [score, setScore] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  // All pokemon's name and type
  const [pokemons, setPokemons] = useState([]);

  // State for generating questions
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const PokemonTypesList = [
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

  const pokemonList = [
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

  // Use effect for generating the pokemon
  useEffect(() => {
    const shuffledPokemonList = shuffle(pokemonList);

    async function getPokemon(pokemon) {
      try {
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
                ...(data.types.length > 1 && {
                  secondaryType: data.types[1].type.name,
                }),
              },
            },
          ];
        });
      } catch (error) {
        alert(error);
      }
    }

    //Empty pokemon list before populating it with new pokemons
    setPokemons([]);
    for (let i = 0; i < 10; i++) {
      getPokemon(shuffledPokemonList[i]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.playCount]);

  function setChoices(array) {
    const choicesArray = array.map((item) => {
      return {
        id: nanoid(),
        choice: item,
        isSelected: false,
        isCorrect: null,
      };
    });
    return choicesArray;
  }

  useEffect(() => {
    setAllQuestions(() => {
      return shuffle(loadNameQuestions().concat(loadTypeQuestions()));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  function selectChoice(id) {
    setAllQuestions((prevAllQuestions) => {
      // Loop over the questions and return a new array that sets the user choice
      return prevAllQuestions.map((question) => {
        // Check if the current question's choices contains the id
        let containsId = question.choices
          .map((choice) => {
            return choice.id === id ? true : false;
          })
          .includes(true);

        const newArray = [];
        question.choices.forEach((choice) => {
          if (choice.id === id) {
            newArray.push({
              ...choice,
              isSelected: !choice.isSelected,
            });
          } else if (containsId) {
            newArray.push({ ...choice, isSelected: false });
          } else {
            newArray.push(choice);
          }
        });
        return {
          ...question,
          choices: newArray,
        };
      });
    });
  }

  function setIsCorrect() {
    setAllQuestions((prevAllQuestions) => {
      return prevAllQuestions.map((question) => {
        const newArray = [];
        let isCorrect = false;

        question.choices.forEach((choice) => {
          if (choice.isSelected) {
            if (question.correctAnswer.includes(choice.choice)) {
              newArray.push({
                ...choice,
                isCorrect: true,
              });
              isCorrect = true;
            } else {
              newArray.push({
                ...choice,
                isCorrect: false,
              });
            }
          } else {
            newArray.push(choice);
          }
        });
        return {
          ...question,
          isCorrect: isCorrect,
          choices: newArray,
        };
      });
    });
    calculateScore();
  }

  function handleReadyClick() {
    setIsReady(true);
  }

  function loadNameQuestions() {
    const tempArray = [];
    pokemons.forEach((pokemon) => {
      const nameChoices = shuffle(
        [pokemon.name].concat(loadNameChoices(pokemon.name))
      );

      const nameQuestion = {
        id: nanoid(),
        questionType: "name",
        name: pokemon.name,
        correctAnswer: [pokemon.name],
        choices: setChoices(nameChoices),
        isCorrect: false,
      };
      tempArray.push(nameQuestion);
    });
    return tempArray;
  }

  function loadNameChoices(name) {
    let selectedPokemon = pokemons.map((pokemon) => {
      return pokemon.name;
    });
    const nameArray = [];
    let randomChoice;
    for (let i = 0; i < 3; i++) {
      randomChoice =
        selectedPokemon[Math.floor(Math.random() * selectedPokemon.length)];
      while (nameArray.includes(randomChoice) || randomChoice === name) {
        randomChoice =
          selectedPokemon[Math.floor(Math.random() * selectedPokemon.length)];
      }
      nameArray.push(randomChoice);
    }
    return nameArray;
  }

  function loadTypeQuestions() {
    const tempArray = [];
    pokemons.forEach((pokemon) => {
      let correctChoice;
      let correctAnswer = [];
      let randomNumber = Math.floor(Math.random() * 2);

      if (pokemon.types.secondaryType !== undefined) {
        randomNumber === 0
          ? (correctChoice = pokemon.types.mainType)
          : (correctChoice = pokemon.types.secondaryType);
        correctAnswer.push(pokemon.types.mainType, pokemon.types.secondaryType);
      } else {
        correctChoice = pokemon.types.mainType;
        correctAnswer.push(pokemon.types.mainType);
      }
      let typeChoices = loadTypeChoices(correctChoice);

      const typeQuestion = {
        id: nanoid(),
        questionType: "type",
        name: pokemon.name,
        correctAnswer: correctAnswer,
        choices: setChoices(typeChoices),
        isCorrect: false,
      };
      tempArray.push(typeQuestion);
    });
    return tempArray;
  }

  function loadTypeChoices(type) {
    const typeArray = [];
    let randomChoice;
    for (let i = 0; i < 3; i++) {
      randomChoice =
        PokemonTypesList[Math.floor(Math.random() * PokemonTypesList.length)];
      while (typeArray.includes(randomChoice) || randomChoice === type) {
        randomChoice =
          PokemonTypesList[Math.floor(Math.random() * PokemonTypesList.length)];
      }
      typeArray.push(randomChoice);
    }
    typeArray.push(type);
    return typeArray;
  }

  function calculateScore() {
    let scoreCounter = 0;
    allQuestions.forEach((question) => {
      question.choices.forEach((choice) => {
        if (choice.isSelected) {
          scoreCounter = question.correctAnswer.includes(choice.choice)
            ? scoreCounter + 1
            : scoreCounter;
        }
      });
    });
    setScore(scoreCounter);
    setIsChecked(true);
  }

  function nextQuestion() {
    setCurrentQuestion((prevCurrentQuestion) => {
      return prevCurrentQuestion + 1;
    });
  }

  function prevQuestion() {
    setCurrentQuestion((prevCurrentQuestion) => {
      return prevCurrentQuestion - 1;
    });
  }

  function playAgain() {
    props.incrementPlayCount();
    setIsReady(false);
    setIsChecked(false);
    setCurrentQuestion(0);
  }

  const pokemonElements = pokemons.map((pokemon) => {
    return <Pokemon pokemon={pokemon} key={pokemon.id} />;
  });

  return (
    <div className="page">
      {isChecked && (
        <h3 className="score--board">{`Score: ${score}/${allQuestions.length}`}</h3>
      )}
      {!isReady && (
        <Memorizepage
          pokemonElements={pokemonElements}
          handleReadyClick={handleReadyClick}
        />
      )}
      {isReady && (
        <Guesspage
          allQuestions={allQuestions}
          selectChoice={(id) => selectChoice(id)}
          setIsCorrect={setIsCorrect}
          shuffle={shuffle}
          score={score}
          calculateScore={calculateScore}
          isChecked={isChecked}
          currentQuestion={currentQuestion}
          nextQuestion={nextQuestion}
          prevQuestion={prevQuestion}
          playAgain={playAgain}
        />
      )}
    </div>
  );
}
