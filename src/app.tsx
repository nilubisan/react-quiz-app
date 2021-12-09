import React, { FC } from "react";
import ReactDOM from "react-dom";
import style from "style.css";

export const Hello: FC = () => {
    return (
        <>
            <h1 className={style.header}> Hello </h1>
        </>
    )
}