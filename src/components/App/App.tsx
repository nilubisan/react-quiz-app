import React, { FC, useState } from "react";
import Score from "../Score/Score";
import style from "./style.scss";
import { fetchQuizQuestions } from "API";
import { QuestionState } from "API";
import Answers from "../Answers/Answers";
import Button from "../Button/Button";
import { START_NEW_QUIZ, SHOW_ANSWERS } from "../../utils";
import Form from "../Form/Form";
import { QuizOptions } from "../Form/Form";
import Header from "../Header/Header";
import Quiz from "../Quiz/Quiz";
import Loader from "../Loader/Loader";
import Greeting from "../Greeting/Greeting";
import Modal from "../Modal/Modal";

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
  const [activeModal, setActiveModal] = useState(false);
  const [activeModalNoQuestions, setActiveModalNoQuestions] = useState(false);

  const quizNotStartedYet = questions.length === 0 && !loading;
  const quizOn = !loading && !quizOver;
  const quizOverAndSelectAction =
    quizOver && !quizNotStartedYet && !showUserAnswers;
  const quizOverAndShowAnswers = quizOver && showUserAnswers;

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
    if(newAnswers.length === 0) {
      setQuizOver(true);
      setQuestions([]);
      setLoading(false);
      setActiveModalNoQuestions(true);
    } else {
      setQuestions(newAnswers);
      setLoading(false);
    }
  };

  const stopQuiz = () => {
    setActiveModal(false);
    setQuizOver(true);
  }

  return (
    <div className={style["app"]}>
      <Header title="Quiz app"></Header>
      <div className={style["container"]}>
        {quizNotStartedYet ? (
          <>
            <Greeting />
            <Form onFormSubmit={startQuiz} />
          </>
        ) : null}
        {quizOn ? (
          <>
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
              setActiveModal={setActiveModal}
            ></Quiz>
          </>
        ) : loading ? (
          <Loader />
        ) : null}
        {quizOverAndSelectAction ? (
          <>
            <Score
              score={score}
              percentage={Math.floor((score / questions.length) * 100)}
            ></Score>
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
            <Button
              buttonType={START_NEW_QUIZ}
              clickHandler={resetQuiz}
            ></Button>
          </>
        ) : null}
        <Modal active={activeModal} setActive={setActiveModal}>
          <div className={style['modal__quiz-over']}>
          <p className={style['modal__title']}> Are you sure you want to stop the quiz? </p>
            <div className={style["modal__buttons-inner"]}>
              <button className={style["modal__button"]} onClick={stopQuiz}>Yes</button>
              <button className={style["modal__button"]} onClick={() => setActiveModal(false)}>No</button>
            </div>
          </div>
        </Modal>
        <Modal active={activeModalNoQuestions} setActive={setActiveModalNoQuestions}>
          <div className={style['modal__quiz-over']}>
          <p className={style['modal__title']}> Sorry, but we couldn't find any questions with given parameters. Try to change quiz options </p>
            <div className={style["modal__buttons-inner"]}>
              <button className={style["modal__button"]} onClick={() => setActiveModalNoQuestions(false)}>Ok</button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default App;
