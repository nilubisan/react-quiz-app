import React, { FC } from "react";
import parse from "html-react-parser";
import { UserAnswer } from "../App/App";
import style from "./style.css";

const Answers: FC<{ userAnswers: UserAnswer[] }> = ({ userAnswers }) => {
  return (
    <div className={style["answers"]}>
      <h2 className={style["answers__header"]}> Answers </h2>
      <div className={style["answers__inner"]}>
        {userAnswers.length === 0 ? <p> You have not responded to any of quiz questions</p> :
        userAnswers.map((item: UserAnswer, i: number) => (
          <div className={style["answer"]} key={i}>
            {parse(`<p class=${style["answer__question"]}>${i+1}. ${item.question}</p>`)}
            {parse(`<p class=${style["answer_user-answer"]}> Your answer: ${item.answer} </p>`)}
            {parse(`<p class=${style["answer_correct-answer"]}> Correct answer: ${item.correctAnswer} </p>`)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Answers;
