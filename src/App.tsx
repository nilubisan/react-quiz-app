import React, { FC, useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard"
import style from "style.css";
import { fetchQuizQuestions } from "API";
import { Difficulty, QuestionState } from "API";

const TOTAL_QUESTIONS = 10;

interface UserAnswer {
    question: string,
    userAnswer: string,
    correctAnswer: string,
    correct: boolean
}

const App: FC = () => {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    const startQuiz = async () => {
        setLoading(true);
        setGameOver(false);
        const newAnswers = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY );
        setQuestions(newAnswers)
        setLoading(false);
    }
    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};
    const nextQuestion = () => {}

    return (
        <div className="app">
            <h1> Quiz App</h1>
            { gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                <button className="start" onClick={startQuiz}> Start quiz</button>
            ) : null
            }
            { !gameOver ? <p className="score"> Score: {score}</p> : null }
            { !loading && !gameOver &&
            <>
            <QuestionCard
                question={questions[number].question}
                answers={questions[number].answers}
                questionNumber={number+1}
                totalQuestions = {TOTAL_QUESTIONS}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
            />
            <button className="next" onClick={nextQuestion}>
                Next Question
            </button>
            </>
}
            {/* <div>
                {
                questions.length === 0 ? "LOADING..." : 
                questions.map((ex, i) =>
                    <>
                    <p key={i}> {ex.question} </p>
                    {ex.answers.map((a:string, l:number) =>
                        <>
                        <input type="radio" key={l} id={a} />
                        <label htmlFor={a}>{a}</label>
                        <br></br>
                        </>
                        )
                    }
                    </>
                )
                }
            </div> */}
        </div>
    )
}

export default App;