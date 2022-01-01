import { Axios, AxiosResponse } from "axios";
import { shuffleArray } from "./utils";

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
  answers: [];
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
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
