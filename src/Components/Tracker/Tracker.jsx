import React from "react";

export default function Tracker(props) {
  return (
    <div className="tracker">
      <h1>
        Question {props.currentQuestion + 1} of {props.totalQuestions}
      </h1>
    </div>
  );
}
