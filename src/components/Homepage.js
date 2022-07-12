import React from "react";

export default function Homepage(props) {
  return (
    <div className="page__home col page">
      <div className="main">
        <div className="col container__brand">
          <div className="container__logo">
            <img
              src={require(`../images/logo.png`)}
              alt="Pokemon logo"
              className="logo"
            />
          </div>
          <h1 className="header__title">Memory Game</h1>
        </div>
        <div className="col">
          <h3 className="homepage__text">
            Do you have what it takes to memorize them all?
          </h3>
          <button className="button" onClick={props.incrementPlayCount}>
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
