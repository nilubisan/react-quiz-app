import React, { FC } from "react";
import parse from 'html-react-parser';
import { UserAnswer } from "../../App";
import styles from "./question-card-styles.css";
interface Props {
    question: string;
    answers: string[];
    userAnswer: UserAnswer;
    questionNumber: number;
    totalQuestions: number;
    correctAnswer: string;
    callback: ((e: React.MouseEvent<HTMLButtonElement>) => void)
}
const QuestionCard:FC<Props> = ({ question, answers, userAnswer, questionNumber, totalQuestions, callback, correctAnswer }) => (
    <div className={styles["card"]}>
        <p className={styles["card__question-number"]}>
            Question: {questionNumber} / {totalQuestions}
        </p>
        {
            parse(`<p className=${styles["card__question"]}> ${question} </p>`)
        }
        <div className={styles["card__answer-btns-container"]}>
            {answers.map((answer, i) =>
                <div key={answer} className={styles["card__answer-btn-inner"]}>
                 <button className={`${styles["card__answer-btn"]} ${correctAnswer === answer ? styles["card__correct-answer"] : ""}`} disabled = {!!userAnswer} value={answer} onClick={callback} key={i}>
                    {
                    parse(`<span> ${answer} </span>`)
                    }
                </button>
                <br />
                </div>
            )}
        </div>
    </div>

)

export default QuestionCard