import React, { FC } from "react";

interface Props {
    question: string;
    answers: string[];
    userAnswer: any;
    questionNumber: number;
    totalQuestions: number;
    callback: any;
}
const QuestionCard:FC<Props> = ({ question, answers, userAnswer, questionNumber, totalQuestions, callback }) => (
    <div>
        <p className="questionNumber">
            Question: {questionNumber} / {totalQuestions}
        </p>
        <p> { question } </p>
        <div>
            {answers.map((answer, i) =>
                <>
                 <button disabled = {userAnswer} onClick={callback} key={i}>
                    <span> {answer} </span>
                </button>
                <br />
                </>
            )}
        </div>
    </div>

)

export default QuestionCard