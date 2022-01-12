import React, { FC } from "react";
import {
  NEXT_QUESTION,
  START_NEW_QUIZ,
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
      classname = "std_btn";
      btnTitle = "NEXT";
      break;
    case FINISH_QUIZ:
      classname = "finish_btn";
      btnTitle = "FINISH";
      break;
    case START_NEW_QUIZ:
      classname = "std_btn";
      btnTitle = "START NEW QUIZ";
      break;
    case SHOW_ANSWERS:
      classname = "std_btn";
      btnTitle = "SHOW ANSWERS"
      break;
  }
  return (
    <button className={`${styles[classname]} ${styles['btn']}`} onClick={clickHandler}>
      {btnTitle}
    </button>
  );
};

export default Button;
