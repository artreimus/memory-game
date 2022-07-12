import React, { useState } from "react";

import Gamepage from "./components/Gamepage";
import Homepage from "./components/Homepage";

export default function App() {
  const [playCount, setPlayCount] = useState(0);

  function incrementPlayCount() {
    setPlayCount((prevPlayCount) => prevPlayCount + 1);
  }

  return (
    <div className={`App  center__all`}>
      {playCount === 0 && <Homepage incrementPlayCount={incrementPlayCount} />}
      {playCount > 0 && (
        <Gamepage
          playCount={playCount}
          incrementPlayCount={incrementPlayCount}
        />
      )}
    </div>
  );
}
