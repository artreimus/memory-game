import React, { useState } from "react";

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
  // Game states
  const [isPlaying, setIsPlaying] = useState(false);

  function handleStartClick() {
    setIsPlaying(true);
  }

  return (
    <div className={`App ${isPlaying ? "" : "center__all"}`}>
      {!isPlaying && <Homepage handleStartClick={handleStartClick} />}
      {isPlaying && <Gamepage />}
    </div>
  );
}
