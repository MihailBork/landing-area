import React from "react";
import b_ from 'b_';
import cn from 'classnames';
import {Element} from 'react-scroll';

import './style.scss';

const features = [
    {
        description: [
            {
                number: 1,
                text: `месяц обучения`,
            }
        ],
        icon: `calendar`
    },
    {
        description: [
            {
                number: 30000,
                text: `рублей`,
            }
        ],
        icon: `ruble`
    },
    {
        description: [
            {
                number: 50,
                text: `часов практики`,
            }
        ],
        icon: `clock`
    }
];

export const b = b_.lock(`Features01`);

const Features01 = () => {
    return (
        <Element name="plan">
            <div className={cn(b(), `ComponentWrapper`)}>
                <div className={b(`title`)}>
                    <h1>Обучающая программа</h1>
                </div>
                <div className={b(`items`)}>
                    {
                        features.map((item, index) => (
                            <div key={index} className={b(`items-column`)}>
                                <div className={b(`items-column-icon`)}>
                                    <img className={b(`items-column-icon-image`)}
                                         src={`/images/Features01/${item.icon}.svg`}/>
                                    <img className={cn(b(`items-column-icon-border`), `item-${index}`)}
                                         src={`/images/Features01/round-black.png`}/>
                                </div>
                                <div className={b(`items-column-description`)}>
                                    {
                                        item.description.map((point, i) => (
                                            <div key={i} className={b(`items-column-description-row`)}>
                                                <div
                                                    className={b(`items-column-description-row-number`)}>{point.number}</div>
                                                <div
                                                    className={b(`items-column-description-row-text`)}>{point.text}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Element>
    )
};

export default Features01;