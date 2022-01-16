import React, {FC} from 'react';
import style from "./style.css";

const Header:FC<{title:string}> = ({title}) => {
    return(
        <header className={style["header"]}> 
            <h1 className={style["header__title"]}>Qwizzz</h1>
        </header>
        
    )
}

export default Header;