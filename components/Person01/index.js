import React, {useState, useEffect} from "react";
import b_ from 'b_';
import cn from 'classnames';

import VisibilitySensor from 'react-visibility-sensor';

import './style.scss';

const info = {
    name: `Айта Лузгина`,
    company: `Интериум`,
    description: `Разнообразный и богатый опыт постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обуславливает создание систем массового участия.`,
};

export const b = b_.lock(`Person01`);

const Person01 = () => {
    const [isShowed, setShowedState] = useState(false);
    const onVisibilityChange = (isVisible) => {
        if (isShowed || !isVisible) return;
        setShowedState(true);
    };
    return (

        <div className={cn(b(), `ComponentWrapper`, {visible: isShowed})}>
            <div className={b(`title`)}>
                <h1>Кто проводит курс?</h1>
            </div>
            <div className={b(`content`)}>
                <VisibilitySensor onChange={onVisibilityChange} partialVisibility={true} minTopValue={250}>
                    <img className={cn(b(`content-image`), {visible: isShowed})} src={`images/Person01/photo.png`}/>
                </VisibilitySensor>
                <div className={cn(b(`content-info`), {visible: isShowed})}>
                    <div className={cn(b(`content-info-name`), `row`)}>{info.name}</div>
                    <div className={cn(b(`content-info-company`), `row`)}>{info.company}</div>
                    <div className={cn(b(`content-info-description`), `row`)}>{info.description}</div>
                </div>
            </div>
        </div>
    )
};

export default Person01;