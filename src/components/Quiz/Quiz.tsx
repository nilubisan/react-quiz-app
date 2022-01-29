import React, { FC, useState } from "react";
import QuestionCard from "../QuestionCard/QuestionCard";
import style from "./style.scss";
import { QuestionState } from "../../API";
import { UserAnswer } from "../App/App";
import Button from "../Button/Button";
import {
  PREV_QUESTION,
  NEXT_QUESTION,
  FINISH_QUIZ,
  ABORT_QUIZ,
} from "../../utils";
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
  const [activeButton, setActiveButton] = useState(false);
  const [enableQuestionBack, setEnableQuestionBack] = useState(false);
  const quizOn = !loading && !quizOver;
  const quizOnAndNotLastQuestion = quizOn && number !== questions.length - 1;
  const quizOnAndLastQuestion = quizOn && number === questions.length - 1;

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!quizOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((prev: number) => prev + 1);
      } else {
        setCorrectAnswer(questions[number].correct_answer);
      }
      const answerObject = {
        question: questions[number].question,
        correctAnswer: questions[number].correct_answer,
        answer,
        correct,
      };
      setUserAnswers((prev: UserAnswer[]) => [...prev, answerObject]);
      setActiveButton(true);
    }
  };

  const prevButtonClickHandler = () => {
    if (number > 0) {
      setNumber((number: number) => number - 1);
      if (number - 1 === 0) setEnableQuestionBack(false);
      setActiveButton(true);
    }
  };

  const nextButtonClickHandler = () => {
    if (activeButton) {
      setNumber((number: number) => number + 1);
      if (!userAnswers[number + 1]) setActiveButton(false);
      !enableQuestionBack ? setEnableQuestionBack(true) : null;
    }
  };
  const finishQuiz = () => {
    if (activeButton) setQuizOver(true);
  };

  const abortQuiz = () => {
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
      <div className={style["button-inner"]}>
        {quizOn ? (
          <Button
            buttonType={PREV_QUESTION}
            enableQuestionBack={enableQuestionBack}
            clickHandler={prevButtonClickHandler}
          />
        ) : null}
        {quizOnAndNotLastQuestion ? (
          <Button
            buttonType={NEXT_QUESTION}
            isActive={activeButton}
            clickHandler={nextButtonClickHandler}
          />
        ) : null}
        {quizOnAndLastQuestion ? (
          <Button
            buttonType={FINISH_QUIZ}
            clickHandler={finishQuiz}
            isActive={activeButton}
          />
        ) : null}
      </div>
      <Button buttonType={ABORT_QUIZ} clickHandler={abortQuiz} />
    </div>
  );
};

export default Quiz;
