import React, { FC, useState, useEffect } from "react";
import { EASY, MEDIUM, HARD } from "../../utils";
import { fetchCategories } from "../../API";
import Loader from "../Loader/Loader";
import style from "./style.scss";

/// INTERFACES
export interface QuizOptions {
  category: number;
  difficulty: "easy" | "medium" | "hard";
  questionsAmount: number;
}

interface QuestionCategory {
  id: number;
  name: string;
}

interface FormProps {
  FormSubmitHandler: (params: QuizOptions) => Promise<void>;
}
/// COMPONENT
const Form: FC<{ onFormSubmit: FormProps["FormSubmitHandler"] }> = ({
  onFormSubmit,
}) => {
  const [questionsCategories, setQuestionsCategories] =
    useState<QuestionCategory[]>();
  const [quizOpts, setQuizOpts] = useState<QuizOptions>({
    category: 0,
    difficulty: "easy",
    questionsAmount: 5,
  }); /// DEFAULT QUIZ OPTIONS
  const [error, setError] = useState();

  useEffect(() => {
    setQnsCategories();
  }, []);

  const getQnsCategories = async () => {
    const categories = await fetchCategories();
    return categories;
  };

  const setQnsCategories = async () => {
    const categories = await getQnsCategories();
    setQuestionsCategories(categories);
    setQuizOpts((prev) => ({
      ...prev,
      category: categories[0].id,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(quizOpts);
  };

  const setQuizCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuizOpts((prev) => ({
      ...prev,
      category: +e.target.value,
    }));
  };

  const setQuizDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuizOpts((prev) => ({
      ...prev,
      difficulty: e.target.value as "easy" | "medium" | "hard",
    }));
  };

  const setQnsAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizOpts((prev) => ({
      ...prev,
      questionsAmount: +e.target.value,
    }));
  };

  return questionsCategories ? (
    <form className={style["form"]} onSubmit={handleFormSubmit}>
      <div className={style["form__field-inner"]}>
        <div className={style["form__field"]}>
          <label>Category:</label>
          <select
            onChange={setQuizCategory}
            value={quizOpts["category"]["id"]}
            required
          >
            {questionsCategories
              ? questionsCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className={style["form__field"]}>
          <label>Difficulty:</label>
          <select onChange={setQuizDifficulty} value={quizOpts["difficulty"]}>
            <option value={EASY}>Easy</option>
            <option value={MEDIUM}>Medium</option>
            <option value={HARD}>Hard</option>
          </select>
        </div>
        <div className={style["form__field"]}>
          <label>Amount:</label>
          <input
            type="number"
            min={1}
            max={50}
            onChange={setQnsAmount}
            value={quizOpts["questionsAmount"]}
          ></input>
        </div>
      </div>
      <div className={style["form__btn-inner"]}>
        <input
          type="submit"
          className={style["form__btn"]}
          value="Start"
        ></input>
      </div>
    </form>
  ) : (
    <Loader />
  );
};

export default Form;
