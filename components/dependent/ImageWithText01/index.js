import React, {useState, useEffect} from "react";
import b_ from 'b_';

import './style.scss';


const ImageWithText01 = ({item, className = `ImageWithText01`}) => {
    const b = b_.lock(className);
    return (
        <div className={b()}>
            <div className={b(`image`)}>
                <img src={`/images/kotelnikovo/${item.image}`}/>
            </div>
            <div className={b(`text`)}>
                {item.text}
            </div>
        </div>
    )
};

export default ImageWithText01;