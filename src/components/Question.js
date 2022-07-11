import React from "react";
import NameChoice from "./NameChoice";
import TypeChoice from "./TypeChoice";

export default function Question(props) {
  let choicesElement;

  if (props.questionType === "name") {
    choicesElement = props.question.choices.map((choice) => (
      <NameChoice
        choice={choice}
        key={choice.id}
        selectChoice={() => props.selectChoice(choice.id)}
        isChecked={props.isChecked}
      />
    ));
  } else if (props.questionType === "type") {
    choicesElement = props.question.choices.map((choice) => (
      <TypeChoice
        choice={choice}
        key={choice.id}
        selectChoice={() => props.selectChoice(choice.id)}
        isChecked={props.isChecked}
      />
    ));
  }

  return (
    <div className="col question">
      <div className="card">
        <div className="card__image">
          <img
            src={require(`../images/${props.question.name}.png`)}
            alt="Card experiences"
          />
        </div>
      </div>
      <div className="row choices">{choicesElement}</div>
    </div>
  );
}
