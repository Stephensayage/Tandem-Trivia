import React from "react";

function Answer(props) {
  let classes = ["answer"];
  let newLetter = "";

  if (props.letter === 0) {
    newLetter = "A";
  } else if (props.letter === 1) {
    newLetter = "B";
  } else if (props.letter === 2) {
    newLetter = "C";
  } else {
    newLetter = "D";
  }

  if (props.selected) {
    classes.push("selected");
  }
  return (
    <div>
      <button
        value={props.answer}
        className={classes.join(" ")}
        onClick={props.handleClick}
      >
        <span className="choice">{newLetter}.) </span>
        {props.answer}
      </button>
    </div>
  );
}
export default React.memo(Answer);
