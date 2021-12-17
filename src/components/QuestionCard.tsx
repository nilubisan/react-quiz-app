import React, { FC } from "react";
import parse from 'html-react-parser';
import { UserAnswer } from "../App";
interface Props {
    question: string;
    answers: string[];
    userAnswer: UserAnswer;
    questionNumber: number;
    totalQuestions: number;
    callback: ((e: React.MouseEvent<HTMLButtonElement>) => void)
}
const QuestionCard:FC<Props> = ({ question, answers, userAnswer, questionNumber, totalQuestions, callback }) => (
    <div>
        <p className="questionNumber">
            Question: {questionNumber} / {totalQuestions}
        </p>
        {
            parse(`<p> ${question} </p>`)
        }
        <div>
            {answers.map((answer, i) =>
                <div key={answer}>
                 <button disabled = {!!userAnswer} value={answer} onClick={callback} key={i}>
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