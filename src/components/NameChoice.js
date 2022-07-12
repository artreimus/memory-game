import React from "react";

export default function NameChoice(props) {
  const stylesGuessing = {
    backgroundColor: props.choice.isSelected ? "#93cbff" : " ",
  };

  const stylesChecked = {
    backgroundColor: props.choice.isSelected
      ? props.choice.isCorrect
        ? "#94d7a2"
        : "#f8cbcb"
      : "",
    opacity: props.choice.isSelected ? "1" : "0.5",
  };

  return (
    <div
      style={props.isChecked ? stylesChecked : stylesGuessing}
      className={"card choice"}
      onClick={!props.isChecked ? props.selectChoice : () => {}}
    >
      {props.choice.choice}
    </div>
  );
}
