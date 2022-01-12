import React, { FC, useState } from "react";
import style from "./style.css";

const BAD = "bad";
const GOOD = "good";
const AWESOME = "awesome"

const resultMessage = {
  "bad": "Not so good...Try another one",
  "good": "Great!",
  "awesome": "Perfect! You are a genius!"
}

const Score: FC<{ score: number; percentage: number }> = ({
  score,
  percentage,
}) => {
  const scoreLevel =
    percentage < 50 ? "bad" : percentage <= 75 ? "good" : "awesome";
  return (
    <div className={style["score__inner"]}>
      <h2 className={style["score__title"]}> Your score is</h2>
      <h2 className={`${style["score__rating"]} ${style[scoreLevel]}`}>
        {score}
      </h2>
      <p className={style["score__result-message"]}>{resultMessage[scoreLevel]}</p>
    </div>
  );
};

export default Score;
