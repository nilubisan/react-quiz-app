import React, {FC} from "react";
import parse from 'html-react-parser';
import {UserAnswer} from "../../App";

const Answers:FC<{userAnswers: UserAnswer[]}>=({ userAnswers }) => {
    return (
        <div>
            {userAnswers.map((item: UserAnswer) => 
                <div>
                    {parse(`<p>${item.question}</p>`)}
                    <p>
                        Your answer: {item.answer}
                    </p>
                    <p>
                        Correct answer: {item.correctAnswer}
                    </p>
                </div>
            )}
        </div>

    )
}

export default Answers;