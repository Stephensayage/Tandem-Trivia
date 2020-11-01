import React, { useEffect, useState, useLayoutEffect } from "react";
import Answer from "../Answer/Answer";

function Answers(props) {
  const answersArray = [
    props.question.incorrect[0],
    props.question.incorrect[1],
    props.question.correct,
    props.question.incorrect[2],
  ];

  return (
    <div className="answers-ctn">
      {answersArray &&
        answersArray.map((item, idx) => {
          return (
            <>
              <Answer
                correctAnswer={props.question.correct}
                letter={idx}
                answer={item}
                selected={props.userAnswer === item}
                handleClick={props.handleClick}
              />
            </>
          );
        })}
    </div>
  );
}
export default React.memo(Answers);
