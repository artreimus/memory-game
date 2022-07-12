import React from "react";
import Question from "./Question";
import Confetti from "react-confetti";
import { useWindowSize } from "../hooks/useWindowSize";

export default function Guesspage(props) {
  const { width, height } = useWindowSize();

  const QuestionElements = props.allQuestions.map((question) => (
    <Question
      question={question}
      questionType={question.questionType}
      key={question.id}
      isChecked={props.isChecked}
      selectChoice={(id) => props.selectChoice(id)}
    />
  ));

  return (
    <div className="container__question col">
      {props.isChecked && props.score === props.allQuestions.length && (
        <Confetti width={width} height={height}></Confetti>
      )}

      {!props.isChecked && <div>{QuestionElements[props.currentQuestion]}</div>}
      {props.isChecked && <div>{QuestionElements}</div>}
      <div className="container__button">
        {props.currentQuestion !== 0 && !props.isChecked && (
          <button onClick={props.prevQuestion} className="button">
            <span class="material-symbols-outlined back">arrow_back_ios</span>{" "}
            Back
          </button>
        )}
        {props.currentQuestion !== props.allQuestions.length - 1 &&
          !props.isChecked && (
            <button onClick={props.nextQuestion} className="button">
              Next
              <span class="material-symbols-outlined next">
                arrow_forward_ios
              </span>
            </button>
          )}
        {props.currentQuestion === props.allQuestions.length - 1 &&
          !props.isChecked && (
            <button
              onClick={props.setIsCorrect}
              className="button button__submit"
            >
              Submit
            </button>
          )}
        {props.isChecked && (
          <button className="button button__reset" onClick={props.playAgain}>
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}
