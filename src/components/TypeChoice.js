import React from "react";

export default function TypeChoice(props) {
  return (
    <div className="col card card__pokemon">
      <div className="row card__pokemon--type">
        <p className={`pokemon__type ${props.choice}`}>{props.choice}</p>
      </div>
    </div>
  );
}
