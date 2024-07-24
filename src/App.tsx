import Axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import Questionaire from "./Component/Questionaire";
// import Header from "./Component/Header";
const API_URL =
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy";
// "https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    Axios.get(API_URL)
      .then((res) => res.data)
      .then((data) => {
        const questions = data.results.map((question) => ({
          ...question,
          answers: [
            question.correct_answer,
            ...question.incorrect_answers,
          ].sort(() => Math.random() - 0.5),
        }));
        setQuestions(questions);
      });
  }, []);

  const handleAnswer = (answer) => {
    if (!showAnswers) {
      if (answer === questions[currentIndex].correct_answer) {
        setScore(score + 1);
      } else {
      }
    }
    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setShowAnswers(false);
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    setShowAnswers(false);
  };
  const restartGame = () => {
    setScore(0);
    setCurrentIndex(0);
    useEffect(() => {
      Axios.get(API_URL)
        .then((res) => res.data)
        .then((data) => {
          const questions = data.results.map((question) => ({
            ...question,
            answers: [
              question.correct_answer,
              ...question.incorrect_answers,
            ].sort(() => Math.random() - 0.5),
          }));
          setQuestions(questions);
        });
    }, []);
  };
  return questions.length > 0 ? (
    <div className="container">
      <h2>Score: {score}</h2>
      <h2>
        {currentIndex} out of {questions.length} Questions
      </h2>
      <button onClick={restartGame} className="next-question">
        Restart Game
      </button>
      {currentIndex >= questions.length ? (
        <h1>
          You got {(score / questions.length) * 100}% right
          <br /> <br />
          Game Ended, Your Score is {score} / {questions.length}!
        </h1>
      ) : (
        <Questionaire
          handleAnswer={handleAnswer}
          showAnswers={showAnswers}
          handleNextQuestion={handleNextQuestion}
          // handlePreviousQuestion={handlePreviousQuestion}
          data={questions[currentIndex]}
        />
      )}
    </div>
  ) : (
    <div className="container">..Loading</div>
  );
}

export default App;
