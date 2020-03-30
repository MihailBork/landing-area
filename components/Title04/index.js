import React, {useState, useEffect} from "react";
import b_ from 'b_';
import HtmlParser from 'react-html-parser';

import './style.scss';
import cn from "classnames";

const title = {
    text: `<span>Уникальный проект</span>по бренду территории<br/>"Котельниково - земля героев"`,
    image: `logo.png`
};

export const b = b_.lock(`Title04`);

const Title04 = () => {

    return (
        <div className={b()}>
            <div className={b(`text`)}>{HtmlParser(title.text)}</div>
            <div className={b(`logo`)}>
                <img src={`/images/kotelnikovo/${title.image}`}/>
            </div>
        </div>
    )
};

export default Title04;