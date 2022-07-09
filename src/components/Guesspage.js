import React from "react";
import TypeChoice from "./TypeChoice";

export default function Guesspage(props) {
  const choiceElement = props.typeChoices.map((choice) => (
    <TypeChoice choice={choice} />
  ));

  // console.log(choiceElement);

  return (
    <div className="homepage">
      <div className="memorizepage">{choiceElement}</div>
    </div>
  );
}
