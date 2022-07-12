import React from "react";
import NameChoice from "./NameChoice";
import TypeChoice from "./TypeChoice";

export default function Question(props) {
  let choicesElement;
  let correctAnswer;

  if (props.questionType === "name") {
    correctAnswer = props.question.correctAnswer[0];
    choicesElement = props.question.choices.map((choice) => (
      <NameChoice
        choice={choice}
        key={choice.id}
        selectChoice={() => props.selectChoice(choice.id)}
        isChecked={props.isChecked}
      />
    ));
  } else if (props.questionType === "type") {
    let choicesArray = props.question.choices.map((choice) => {
      return choice.choice;
    });
    let resultArray = props.question.correctAnswer.filter((answer) => {
      return choicesArray.includes(answer);
    });

    resultArray.length > 1
      ? (correctAnswer = `${resultArray[0]} or ${resultArray[1]}`)
      : (correctAnswer = `${resultArray[0]} `);

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
      {props.isChecked && !props.question.isCorrect && (
        <div className="correct--answer">
          Correct Answer: <span>{correctAnswer}</span>
        </div>
      )}
    </div>
  );
}
