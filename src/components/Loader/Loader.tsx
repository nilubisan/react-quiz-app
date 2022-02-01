import React, { FC } from "react";
import style from "./style.scss";

const Loader: FC<{}> = () => {
  return <div className={style["loader"]}></div>;
};

export default Loader;
