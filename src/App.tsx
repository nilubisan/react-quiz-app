import React, { FC, useState } from "react";
import QuestionCard from "./components/QuestionCard/QuestionCard"
import style from "app-styles.css";
import questionCardStyles from "./components/QuestionCard/question-card-styles.css"
import { fetchQuizQuestions } from "API";
import { Difficulty, QuestionState } from "API";
import Answers from "./components/Answers/Answers";

const TOTAL_QUESTIONS = 5;

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
    const [correctAnswer, setCorrectAnswer] = useState("");

    const gameOn = !loading && !gameOver;
    const gameOnAndNotLastQuestion = gameOn && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1;
    const gameOnAndLastQuestion = (gameOn && userAnswers.length === TOTAL_QUESTIONS);
    
    const startQuiz = async () => {
        setLoading(true);
        setGameOver(false);
        setNumber(0);
        setScore(0);
        setUserAnswers([]);
        const newAnswers = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
        setQuestions(newAnswers);
        setLoading(false);
    };

    const finishGame = () => {
        setGameOver(true);
        setNumber(0);
    }

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(!gameOver) {
            const answer = e.currentTarget.value;
            const correct = questions[number].correct_answer === answer;
            if(correct)  {
                setScore(prev => prev + 1);
                e.currentTarget.classList.add(questionCardStyles["card__correct-answer"]);
            }
            else {
                e.currentTarget.classList.add(questionCardStyles["card__wrong-answer"]);
                setCorrectAnswer(questions[number].correct_answer);
            }
            const answerObject = {
                question: questions[number].question,
                correctAnswer: questions[number].correct_answer,
                answer,
                correct,
            }
            setUserAnswers((prev) => [...prev, answerObject])
            // if(number+1 === TOTAL_QUESTIONS) setGameOver(true);
        }
    };

    const nextQuestion = () => {
        const nextQuestion = number + 1;
        // if(nextQuestion === TOTAL_QUESTIONS) setGameOver(true);
        setNumber(nextQuestion)
    }

    return (
        <div className={style["app"]}>
            <h1 className={style["app__header"]}> Quiz App</h1>
            { !gameOver ? <p className={style["app__score"]}> Score: {score}</p> : null }
            { gameOn ?
            <QuestionCard
                question={questions[number].question}
                answers={questions[number].answers}
                questionNumber={number+1}
                totalQuestions = {TOTAL_QUESTIONS}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
                correctAnswer={correctAnswer}
            />
            : loading ? "loading..." : null
            }
            {
                gameOnAndNotLastQuestion ? (
            <button className={style["app__next-btn"]} onClick={nextQuestion}>
                NEXT
            </button>
                ) : null
            }
             {
                gameOnAndLastQuestion ? (
            <button className={style["app__next-btn"]} onClick={finishGame}>
                Finish game
            </button>
                ) : null
            }
            { gameOver && userAnswers.length === TOTAL_QUESTIONS ? (
                <Answers userAnswers={userAnswers} />
            ) : null
            }
            { number === 0 && gameOver === true ? (
                <div>
                    <button className={style["app__start-button"]} onClick={startQuiz}>Start new quiz</button>
                </div>
            ) : null
            }
        </div>
    )
}

export default App;