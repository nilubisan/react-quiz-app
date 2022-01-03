import React, { FC, useState } from "react";
import QuestionCard from "./components/QuestionCard/QuestionCard";
import Score from "./components/Score/Score";
import style from "app-styles.css";
import questionCardStyles from "./components/QuestionCard/question-card-styles.css";
import { fetchQuizQuestions } from "API";
import { Difficulty, QuestionState } from "API";
import Answers from "./components/Answers/Answers";
import Button from "./components/Button/Button";
import { START_QUIZ, NEXT_QUESTION, FINISH_QUIZ, SHOW_ANSWERS } from "./utils";
import Form from "./components/Form/Form";
import { quizOptions } from "./components/Form/Form";

export interface UserAnswer {
  question: string;
  answer: string;
  correctAnswer: string;
  correct: boolean;
}

const App: FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [showUserAnswers, setShowUserAnswers] = useState(false);

  const gameOn = !loading && !gameOver;
  const gameOnAndNotLastQuestion =
    gameOn &&
    userAnswers.length === number + 1 &&
    number !== questions.length - 1;
  const gameOnAndLastQuestion =
    gameOn && userAnswers.length === questions.length;

  const resetGame = () => {
    setLoading(true);
    setGameOver(false);
    setNumber(0);
    setScore(0);
    setUserAnswers([]);
    setShowUserAnswers(false);
  };

  const startQuiz = async (quizOptions:quizOptions) => {
    resetGame();
    const newAnswers = await fetchQuizQuestions(quizOptions);
    setQuestions(newAnswers);
    setLoading(false);
  };

  const finishGame = () => {
    setGameOver(true);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((prev) => prev + 1);
        e.currentTarget.classList.add(
          questionCardStyles["card__correct-answer"]
        );
      } else {
        e.currentTarget.classList.add(questionCardStyles["card__wrong-answer"]);
        setCorrectAnswer(questions[number].correct_answer);
      }
      const answerObject = {
        question: questions[number].question,
        correctAnswer: questions[number].correct_answer,
        answer,
        correct,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  return (
    <div className={style["app"]}>
      <h1 className={style["app__header"]}> Quiz App</h1>
      <Form
        onFormSubmit={startQuiz}
      />
      {!gameOver ? (
        <p className={style["app__score"]}> Score: {score}</p>
      ) : null}
      {gameOn ? (
        <QuestionCard
          question={questions[number].question}
          answers={questions[number].answers}
          questionNumber={number + 1}
          totalQuestions={questions.length}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
          correctAnswer={correctAnswer}
        />
      ) : loading ? (
        "loading..."
      ) : null}
      {gameOnAndNotLastQuestion ? (
        <Button
          buttonType={NEXT_QUESTION}
          clickHandler={() => setNumber((number) => number + 1)}
        />
      ) : null}
      {gameOnAndLastQuestion ? (
        <Button buttonType={FINISH_QUIZ} clickHandler={finishGame} />
      ) : null}
      {gameOver &&
      userAnswers.length === questions.length &&
      !showUserAnswers ? (
        <>
          <Score score={score}></Score>
          <div className={style["app__buttons"]}>
          <Button
            buttonType={SHOW_ANSWERS}
            clickHandler={() => setShowUserAnswers(true)}
          />
          </div>

        </>
      ) : null}
      {gameOver && userAnswers.length === questions.length && showUserAnswers ? (
        <Answers userAnswers={userAnswers} />
      ) : null}
    </div>
  );
};

export default App;
