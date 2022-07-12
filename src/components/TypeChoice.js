import React from "react";

export default function TypeChoice(props) {
  const stylesGuessing = {
    backgroundColor: props.choice.isSelected ? "#93cbff" : "",
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
      className="card  choice"
      style={props.isChecked ? stylesChecked : stylesGuessing}
      onClick={!props.isChecked ? props.selectChoice : () => {}}
    >
      <div className={`${props.choice.choice}  pokemon__type `}>
        {props.choice.choice}
      </div>
    </div>
  );
}
