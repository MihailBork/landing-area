import React, {useState, useEffect} from "react";
import b_ from 'b_';
import cn from 'classnames';
import {Link} from 'react-scroll';

import './style.scss';


export const b = b_.lock(`Menu02`);

const Menu02 = ({innerWidth}) => {
    const [isMobile, setMobileState] = useState(false);
    const [isOpened, setOpenedState] = useState(false);

    const handleClick = () => {
        setOpenedState(!isOpened);
    };

    const handleScroll = () => {
        if (!isOpened) return;
        setOpenedState(false);
    };

    const _isMobile = innerWidth < 601;
    if (_isMobile !== isMobile)
        setMobileState(_isMobile);

    useEffect(() => {
        if (!process.browser) return;
        window.addEventListener(`scroll`, handleScroll);
        return () => {
            window.removeEventListener(`scroll`, handleScroll);
        }
    })

    return (
        <div className={b()}>
            <div className={b(`title`)}>Котельниково - земля героев</div>
            <ul className={b(`items`)}>
                <Link to="about" spy={true} smooth={true} duration={1000}>
                    <li className={b(`items-list`)}>О проекте</li>
                </Link>
                <Link to="photo" spy={true} smooth={true} duration={1000}>
                    <li className={b(`items-list`)}>Фото</li>
                </Link>
                <Link to="video" spy={true} smooth={true} duration={1000}>
                    <li className={b(`items-list`)}>Видео</li>
                </Link>
                <Link to="contacts" spy={true} smooth={true} duration={1000}>
                    <li className={b(`items-list`)}>Контакты</li>
                </Link>
            </ul>
            <div className={cn(b(`submenu`), {opened: isOpened})}>
                <div className={b(`submenu-button`)} onClick={handleClick}>Конкурсы</div>
                <ul className={b(`submenu-items`)}>
                    <Link to="list1" spy={true} smooth={true} duration={1000}>
                        <li>Конкурс детских сочинений</li>
                    </Link>
                    <Link to="list2" spy={true} smooth={true} duration={1000}>
                        <li>Конкурс архитектурных проектов</li>
                    </Link>
                </ul>
            </div>
        </div>
    )
};

export default Menu02;