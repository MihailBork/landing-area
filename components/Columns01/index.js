import React, {useState, useEffect} from "react";
import b_ from 'b_';
import cn from 'classnames';
import {Element} from 'react-scroll';

import './style.scss';

const list = [
    {
        id: `Курс 1`,
        title: `СТРАТЕГИИ БРЕНД-МЕНЕДЖЕРА`,
        subTitle: `КАК СОЗДАТЬ БРЕНД В ИНТЕРНЕТЕ`,
        description: `Как создать стратегию для брендов, человека, органа власти и вообще любого продвигаемого продукта в PR и рекламе. Какие тренды 2020 года можно использовать в своих стратегиях.`,
    },
    {
        id: `Курс 2`,
        title: `РЕПУТАЦИЯ В ИНТЕРНЕТЕ`,
        subTitle: `РАБОТА С НЕГАТИВОМ`,
        description: `Как находить и отрабатывать негатив в сети. Первые шаги в кризисных ситуациях на примере реальных кейсов.`,
    }
];

export const b = b_.lock(`Columns01`);

const Columns01 = () => {
    return (
        <Element name="about">
            <div className={cn(b(), `ComponentWrapper`)}>
                <div className={b(`title`)}>
                    <h1>О курсах</h1>
                </div>
                <div className={b(`items`)}>
                    <div className={b(`items-row`)}>
                        <div className={b(`items-row-id`)}>{list[0].id}</div>
                        <div className={b(`items-row-title`)}>{list[0].title}</div>
                        <div className={b(`items-row-subtitle`)}>{list[0].subTitle}</div>
                        <div className={b(`items-row-description`)}>{list[0].description}</div>
                    </div>
                    <div className={b(`items-row`)}>
                        <div className={b(`items-row-id`)}>{list[1].id}</div>
                        <div className={b(`items-row-title`)}>{list[1].title}</div>
                        <div className={b(`items-row-subtitle`)}>{list[1].subTitle}</div>
                        <div className={b(`items-row-description`)}>{list[1].description}</div>
                    </div>
                </div>
            </div>
        </Element>
    )
};

export default Columns01;