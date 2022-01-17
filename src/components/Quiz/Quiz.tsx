import React, { FC, useState } from "react";
import QuestionCard from "../QuestionCard/QuestionCard";
import questionCardStyle from "../QuestionCard/style.css";
import style from "./style.css";
import { QuestionState } from "../../API";
import { UserAnswer } from "../App/App";
import Button from "../Button/Button";
import { NEXT_QUESTION, FINISH_QUIZ } from "../../utils";
import Loader from "../Loader/Loader";

interface QuizProps {
  quizOver: boolean;
  setQuizOver: any;
  loading: boolean;
  score: number;
  setScore: any;
  questions: QuestionState[];
  number: number;
  setNumber: any;
  userAnswers: UserAnswer[];
  setUserAnswers: any;
}

const Quiz: FC<QuizProps> = ({
  quizOver,
  setQuizOver,
  loading,
  score,
  setScore,
  questions,
  number,
  setNumber,
  userAnswers,
  setUserAnswers,
}) => {
  const [correctAnswer, setCorrectAnswer] = useState("");
  const quizOn = !loading && !quizOver;
  const quizOnAndNotLastQuestion =
    quizOn &&
    userAnswers.length === number + 1 &&
    number !== questions.length - 1;
  const quizOnAndLastQuestion =
    quizOn && userAnswers.length === questions.length;

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!quizOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((prev: number) => prev + 1);
        e.currentTarget.classList.add(
          questionCardStyle["card__correct-answer"]
        );
      } else {
        e.currentTarget.classList.add(questionCardStyle["card__wrong-answer"]);
        setCorrectAnswer(questions[number].correct_answer);
      }
      const answerObject = {
        question: questions[number].question,
        correctAnswer: questions[number].correct_answer,
        answer,
        correct,
      };
      setUserAnswers((prev: UserAnswer[]) => [...prev, answerObject]);
    }
  };

  const finishQuiz = () => {
    setQuizOver(true);
  };

  return (
    <div className={style["quiz__body"]}>
      <p className={style["quiz__score"]}> Score: {score}</p>
      <QuestionCard
        question={questions[number].question}
        answers={questions[number].answers}
        questionNumber={number + 1}
        totalQuestions={questions.length}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
        correctAnswer={correctAnswer}
      />
      {loading ? <Loader /> : null}
      {quizOnAndNotLastQuestion ? (
        <div className={style["button-inner"]}>
        <Button
          buttonType={NEXT_QUESTION}
          clickHandler={() => setNumber((number: number) => number + 1)}
        />
        </div>
      ) : null}
      {quizOnAndLastQuestion ? (
        <div className={style["button-inner"]}>
        <Button buttonType={FINISH_QUIZ} clickHandler={finishQuiz} />
        </div>
      ) : null}
    </div>
  );
};

export default Quiz;
