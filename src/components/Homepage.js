import React from "react";

export default function Homepage(props) {
  return (
    <div className="homepage">
      <main>
        <div className="row title__container">
          <div className="container__logo">
            <img
              src={require(`../images/logo.png`)}
              alt="logo"
              className="logo"
            />
          </div>
          <h1>Memory Game</h1>
        </div>
        <div className="col">
          <h3 className="homepage__text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi,
            distinctio.
          </h3>
          <button className="button" onClick={props.handleStartClick}>
            Start Game
          </button>
        </div>
      </main>
    </div>
  );
}
