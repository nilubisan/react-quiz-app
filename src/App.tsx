import React, { FC, useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard"
import style from "app-styles.css";
import { fetchQuizQuestions } from "API";
import { Difficulty, QuestionState } from "API";

const TOTAL_QUESTIONS = 10;

export interface UserAnswer {
    question: string,
    answer: string,
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
        setNumber(0);
        setScore(0);
        setUserAnswers([]);
        const newAnswers = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
        setQuestions(newAnswers);
        setLoading(false);
    }
    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(!gameOver) {
            const answer = e.currentTarget.value;
            const correct = questions[number].correct_answer === answer;
            if(correct) setScore(prev => prev + 1);
            const answerObject = {
                question: questions[number].question,
                correctAnswer: questions[number].correct_answer,
                answer,
                correct,
            }
            setUserAnswers((prev) => [...prev, answerObject])
        }
    };
    const nextQuestion = () => {
        const nextQuestion = number + 1;
        if(nextQuestion === TOTAL_QUESTIONS) setGameOver(true);
        else setNumber(nextQuestion)
    }

    return (
        <div className={style["app"]}>
            <h1 className={style["app__header"]}> Quiz App</h1>
            { gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                <button className={style["app__start-button"]} onClick={startQuiz}>Start quiz</button>
            ) : null
            }
            { !gameOver ? <p className="score"> Score: {score}</p> : null }
            { !loading && !gameOver ?
            <QuestionCard
                question={questions[number].question}
                answers={questions[number].answers}
                questionNumber={number+1}
                totalQuestions = {TOTAL_QUESTIONS}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
            />
            : loading ? "loading..." : null
            }
            {
                !gameOver &&
                !loading &&
                userAnswers.length === number + 1 &&
                number !== TOTAL_QUESTIONS - 1 ? (
            <button className="next" onClick={nextQuestion}>
                Next Question
            </button>
                ) : null
}
        </div>
    )
}

export default App;