import React, {FC} from 'react';
import style from "./style.css";

const Header:FC<{title:string}> = ({title}) => {
    return(
        <h1 className={style["header"]}>{title}</h1>
    )
}

export default Header;