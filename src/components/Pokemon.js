import React from "react";

export default function Pokemon(props) {
  return (
    <div className="card card__pokemon">
      <div className="card__image">
        <img
          src={require(`../images/${props.pokemon.name}.png`)}
          alt="Card experiences"
        />
      </div>

      <p className="pokemon__name">{props.pokemon.name}</p>
      <div className="row card__pokemon--type">
        <p className={`pokemon__type ${props.pokemon.types.mainType}`}>
          {props.pokemon.types.mainType}
        </p>
        {props.pokemon.types.secondaryType && (
          <p className={`pokemon__type ${props.pokemon.types.secondaryType}`}>
            {props.pokemon.types.secondaryType}
          </p>
        )}
      </div>
    </div>
  );
}
