import React, { FC } from "react";
import { BUTTONS } from "./BUTTONS";
import styles from "./style.css";

interface ButtonProps {
  buttonType: string;
  isActive?: boolean;
  clickHandler: () => void;
}

const Button: FC<ButtonProps> = ({ buttonType, clickHandler, isActive }) => {
  let { className, title } = BUTTONS[buttonType];

  return (
    <button
      className={`${styles["btn"]} ${styles[className]} ${
        isActive === false ? styles["inactive"] : null
      }`}
      onClick={clickHandler}
    >
      {title}
    </button>
  );
};

export default Button;
