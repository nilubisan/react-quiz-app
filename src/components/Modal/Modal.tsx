import React, { FC } from "react";
import style from "./style.scss";

interface ModalProps {
  active: boolean;
  setActive: any;
}

const Modal: FC<ModalProps> = ({ active, setActive, children }) => {
  return (
    <div
      className={
        active ? `${style["modal"]} ${style["active"]}` : `${style["modal"]}`
      }
      onClick={() => setActive(false)}
    >
      <div
        className={
          active
            ? `${style["modal__content"]} ${style["active"]}`
            : `${style["modal__content"]}`
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
