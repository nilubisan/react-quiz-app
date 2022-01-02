import React, { FC, useState } from "react";

const Score: FC<{score:number}> = ({score}) => {
    return(
        <h2> Your score is {score} </h2>
    )
}

export default Score