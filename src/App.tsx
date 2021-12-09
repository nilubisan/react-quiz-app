import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import QuestionCard from "./components/QuestionCard"
import style from "style.css";

const App: FC = () => {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);

    const startQuiz = async () => {}
    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};
    const nextQuestion = () => {}
    return (
        <div className="app">
            <h1> Quiz App</h1>
            <button className="start" onClick={startQuiz}> Start quiz</button>
            <p className="score"> Score: </p>
            <QuestionCard
                question={questions[number]}
                answers={questions[number].answers}
                questionNumber={number-1}
                totalQuestions = {TOTAL_QUESTIONS}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
            />
            <button className="next" onClick={nextQuestion}>
                Next Question
            </button>
        </div>
    )
}

export default App;