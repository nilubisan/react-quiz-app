import React, { FC } from "react";
import style from "./style.css";

const Greeting: FC<{}> = () => {
    return(
        <div className={style["container"]}>
            <h2 className={style["title"]}>Hi!</h2>
            <p className={style["body"]}>
                Welcome to React Quiz App. Here you can choose any area of human life, such as science, history, math and etc, and take part in quiz. To start quiz you must set quiz options below and click start button. Good luck!
            </p>
        </div>
    )
}

export default Greeting;