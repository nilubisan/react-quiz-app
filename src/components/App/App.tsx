import React, { FC, useState } from "react";
import Score from "../Score/Score";
import style from "./style.css";
import { fetchQuizQuestions } from "API";
import { QuestionState } from "API";
import Answers from "../Answers/Answers";
import Button from "../Button/Button";
import {
  START_NEW_QUIZ,
  SHOW_ANSWERS
} from "../../utils";
import Form from "../Form/Form";
import { QuizOptions } from "../Form/Form";
import Header from "../Header/Header";
import Quiz from "../Quiz/Quiz";

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
  const [quizOver, setQuizOver] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [showUserAnswers, setShowUserAnswers] = useState(false);

  const quizNotStartedYet = questions.length === 0 && !loading;
  const quizOn = !loading && !quizOver;
  const quizOverAndSelectAction =
    quizOver && userAnswers.length !== 0 && !showUserAnswers;
  const quizOverAndShowAnswers =
    quizOver && userAnswers.length === questions.length && showUserAnswers;

  const resetQuiz = () => {
    setQuizOver(true);
    setQuestions([]);
    setNumber(0);
    setScore(0);
    setUserAnswers([]);
    setCorrectAnswer("");
    setShowUserAnswers(false);
  };

  const startQuiz = async (quizOptions: QuizOptions) => {
    resetQuiz();
    setQuizOver(false);
    setLoading(true);
    const newAnswers = await fetchQuizQuestions(quizOptions);
    setQuestions(newAnswers);
    setLoading(false);
  };

  return (
    <div className={style["app"]}>
      <Header title="Quiz app"></Header>
      {quizNotStartedYet ? <Form onFormSubmit={startQuiz} /> : null}
      {quizOn ? (
        <Quiz
          quizOver={quizOver}
          setQuizOver={setQuizOver}
          loading={loading}
          score={score}
          setScore={setScore}
          questions={questions}
          number={number}
          setNumber={setNumber}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
        ></Quiz>
      ) : null}
      {quizOverAndSelectAction ? (
        <>
          <Score score={score} percentage={Math.floor((score/questions.length)*100)}></Score>
          <div className={style["app__buttons"]}>
            <Button
              buttonType={SHOW_ANSWERS}
              clickHandler={() => setShowUserAnswers(true)}
            />
            <Button
              buttonType={START_NEW_QUIZ}
              clickHandler={resetQuiz}
            ></Button>
          </div>
        </>
      ) : null}
      {quizOverAndShowAnswers ? (
        <>
          <Answers userAnswers={userAnswers} />
          <Button buttonType={START_NEW_QUIZ} clickHandler={resetQuiz}></Button>
        </>
      ) : null}
    </div>
  );
};

export default App;
