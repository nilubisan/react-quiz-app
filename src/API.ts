import { shuffleArray } from "./utils";
import { QuizOptions } from "./components/Form/Form";
const API_URL = "https://opentdb.com";
const axios = require("axios").default;

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "mediuim",
  HARD = "hard",
}

export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface QuestionState extends Question {
  answers: any[];
}

export const fetchQuizQuestions = async (quizOptions: QuizOptions) => {
  const { difficulty, questionsAmount, category } = quizOptions;
  const url = `${API_URL}/api.php?category=${category}&amount=${questionsAmount}&difficulty=${difficulty}&type=multiple`;
  const {
    data: { results },
  } = await axios.get(url);
  return results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};

export const fetchCategories = async () => {
  const url = `${API_URL}/api_category.php`;
  const { data } = await axios.get(url);
  return data["trivia_categories"];
};
