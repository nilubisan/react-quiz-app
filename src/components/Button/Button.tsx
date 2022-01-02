import React, { EventHandler, FC } from "react";
import {
  NEXT_QUESTION,
  START_QUIZ,
  FINISH_QUIZ,
  SHOW_ANSWERS,
} from "../../utils";
import styles from "./style.css";

const Button: FC<{ buttonType: string; clickHandler: () => void }> = ({
  buttonType,
  clickHandler,
}) => {
  let classname: string, btnTitle: string;
  switch (buttonType) {
    case NEXT_QUESTION:
      classname = "btn";
      btnTitle = "NEXT";
      break;
    case FINISH_QUIZ:
      classname = "finish-btn";
      btnTitle = "FINISH";
      break;
    case START_QUIZ:
      classname = "start-btn";
      btnTitle = "START QUIZ";
      break;
    case SHOW_ANSWERS:
      classname = "btn";
      btnTitle = "SHOW ANSWERS"
      break;
  }
  return (
    <button className={styles[`${classname}`]} onClick={clickHandler}>
      {btnTitle}
    </button>
  );
};

export default Button;
