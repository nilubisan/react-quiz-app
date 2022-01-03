import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { EASY, MEDIUM, HARD } from "../../utils";

export interface quizOptions {
  category: number;
  difficulty: "easy" | "medium" | "hard";
  questionsAmount: number;
}

interface TriviaCategory {
  id: number,
  name: string
}
const fetchCategories = async () => {
  const url = "https://opentdb.com/api_category.php";
  const { data } = await axios.get(url);
  return data["trivia_categories"];
};

const Form: FC<{onFormSubmit: (quizOptions:quizOptions) => Promise<void>}> = ({onFormSubmit}) => {
  const [categories, setCategories] = useState<TriviaCategory[]>();
  const [quizOpts, setQuizOpts] = useState<quizOptions>({
    category: 0,
    difficulty: "easy",
    questionsAmount: 10
  });
  const setCat = async () => {
    const categories = await fetchCategories();
    setCategories(categories);
    setQuizOpts((prev) => ({
      ...prev,
      category: categories[0].id,
    }));
  };
  useEffect(() => {
    setCat();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(quizOpts);
  };

  const setQuizCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuizOpts((prev) => ({
      ...prev,
      category:  +e.target.value,
    }));
  };

  const setQuizDiff = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuizOpts((prev) => ({
      ...prev,
      difficulty: e.target.value as "easy" | "medium" | "hard",
    }));
  };

  const setQuestionsAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizOpts((prev) => ({
      ...prev,
      questionsAmount: +e.target.value
    }));
  };

  return (
      <form onSubmit={handleSubmit}>
        <label>
          Category of the questions:
          <br />
          <select onChange={setQuizCategory} value={quizOpts["category"]["id"]} required>
            {categories
              ? categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              : null}
          </select>
        </label>
        <br />
        <label>
          Choose the amount of questions:
          <br />
          <input type="number" min={1} max={50} onChange={setQuestionsAmount} value={quizOpts["questionsAmount"]}></input>
        </label>
        <br />
        <label>
          Choose difficulty:
          <br />
          <select onChange={setQuizDiff} value={quizOpts["difficulty"]}>
            <option value={EASY}>Easy</option>
            <option value={MEDIUM}>Medium</option>
            <option value={HARD}>Hard</option>
          </select>
        </label>
        <br />
        <input type="submit"></input>
      </form>
  );
};

export default Form;
