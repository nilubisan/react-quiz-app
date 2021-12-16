import React, { FC } from "react";
import parse from 'html-react-parser';
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
        {
            parse(`<p> ${question} </p>`)
        }
        <div>
            {answers.map((answer, i) => 
                <div key={answer}>
                 <button disabled = {userAnswer} value={answer} onClick={callback} key={i}>
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