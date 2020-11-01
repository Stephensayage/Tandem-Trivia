import logo from "./logo.svg";
import "./App.css";
import data from "./data.json";
import { Button, Jumbotron } from "react-bootstrap";
import { useSpring, animated } from "react-spring";

import Tracker from "./Components/Tracker/Tracker";
import Question from "./Components/Question/Question";
import Answers from "./Components/Answers/Answers";
import { useState, useEffect } from "react";
import BaseDialog from "./Components/BaseDialog/BaseDialog";

function App() {
  const [questionSet, setQuestionSet] = useState(); // keeps track of shuffled question set
  const [currentQuestion, setCurrentQuestion] = useState(0); // keeps track of current question
  const [userAnswer, setUserAnswer] = useState(""); // logs users answer
  const [submittedAnswer, setSubmittedAnswer] = useState([]); // submits users answer
  const [show, setShow] = useState(false); // close and open modal
  const [results, setResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    shuffle();
  }, []);

  // function to shuffle questions
  const shuffle = () => {
    const shuffledQuestions = data.sort(function () {
      return Math.round(Math.random()) - 0.5;
    });
    setQuestionSet(shuffledQuestions);
  };
  const question = data[currentQuestion];

  // gets the value of the answer you clicked to help with styling and logging answers
  const handleClick = (e) => {
    e.preventDefault();
    setUserAnswer(e.target.value);
  };
  // function to close the dialog
  const handleClose = () => setShow(false);

  //function to submit answer and move to the next question
  const nextQuestion = () => {
    // function to handle going to the next question
    setTimeout(function () {
      if (userAnswer === "") {
        setShow(true);
        return;
      }
      if (currentQuestion === 9) {
        setResults(true);
      }
      const answer = { correctAnswer: question.correct, answer: userAnswer };
      submittedAnswer.push(answer);
      setSubmittedAnswer(submittedAnswer);
      setUserAnswer("");
      getResults(submittedAnswer);
      if (currentQuestion + 1 < data.length) {
        setCurrentQuestion(currentQuestion + 1);

        return; // so we don't keep going
      }
    }, 500);
  };

  // restarts the game.
  const restartGame = () => {
    shuffle();
    setSubmittedAnswer([]);
    setCurrentQuestion(0);
    setUserAnswer("");
    setResults(false);
    setScore(0);
  };

  const getResults = (arr) => {
    return arr.map((answer) => {
      if (answer.correctAnswer === answer.answer) {
        setScore(score + 1);
      } else {
        setScore(score);
      }
    });
  };
  const spring = useSpring({
    number: score,
    from: { number: 0 },
    config: { mass: 8, tension: 200, friction: 200 },
  });
  if (results) {
    return (
      <div className="App">
        <header className="">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/427/427735.svg"
            className="App-logo"
            alt="logo"
          />
          <h1 className="title">You Did It!</h1>
        </header>
        <div className="scoreboard">
          <h1>
            Results: You have gotten{" "}
            {spring && (
              <animated.span>
                {spring.number.interpolate((num) => Math.ceil(num))}
              </animated.span>
            )}{" "}
            out of 10 right
          </h1>
        </div>
        <Button onClick={restartGame}>Play Again!</Button>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/427/427735.svg"
            className="App-logo"
            alt="logo"
          />
          <h1 className="title">Welcome to Tandem Trivia</h1>
        </header>
        <Jumbotron className="scoreboard">
          <Tracker totalQuestions="10" currentQuestion={currentQuestion} />
          <Question question={question.question} />
          <span className="current-score">{score} Correct out of 10</span>
        </Jumbotron>
        <Answers
          question={question}
          userAnswer={userAnswer}
          handleClick={handleClick}
        />
        <Button className="submit-btn" variant="primary" onClick={nextQuestion}>
          <strong>Submit</strong>
        </Button>
        <BaseDialog show={show} handleClose={handleClose} />
      </div>
    );
  }
}

export default App;
