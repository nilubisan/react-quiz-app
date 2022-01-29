import React, { FC } from "react";
import style from "./style.scss";

const Greeting: FC<{}> = () => {
    return(
        <div className={style["container"]}>
            <h2 className={style["title"]}>Let's start quiz!</h2>
        </div>
    )
}

export default Greeting;