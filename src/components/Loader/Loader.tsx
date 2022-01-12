import React, {FC} from "react";
import style from './style.css';

const Loader: FC<{}> = () => {
    return (
        <div className={style["loader"]}></div>
    )
}

export default Loader;