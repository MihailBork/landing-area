import React, {useState, useEffect} from "react";
import b_ from 'b_';
import _ from 'lodash';
import {Link} from 'react-scroll';
import {motion} from 'framer-motion';

import './style.scss';
import cn from "classnames";

const titles = {
    left: [`18 февраля`, `Айта Лузгина`, `Курс`],
    right: [`РЭУ им. Плеханова`, `Проектный директор агенства Интериум`, `Стратегия ведения соцсетей`],
};

const elements = [
    {
        title: `18 февраля`,
        description: `РЭУ им. Плеханова`,
    },
    {
        title: `Айта Лузгина`,
        description: `Интериум`,
    },
    {
        title: `Курс`,
        description: `Стратегия ведения соцсетей`,
    },
];

const MOVE_VALUE = 20;

export const b = b_.lock(`Title01`);

const Title01 = ({isScrolled}) => {
    const [count, setCount] = useState(0);
    const [isWaitAnimation, setIsWaitAnimation] = useState(false);
    const isPortrait = process.browser ? window.matchMedia("(orientation: portrait)").matches : false;
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsWaitAnimation(true);
        }, 5000);
        return () => clearTimeout(timer);
    });
    useEffect(() => {
        if (!isWaitAnimation) return;
        const timer = setTimeout(() => {
            setCount(_.size(elements) > count + 1 ? count + 1 : 0);
            setIsWaitAnimation(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [isWaitAnimation]);
    const leftText = elements[count].title;
    const rightText = elements[count].description;
    const axis = isPortrait ? `x` : `y`;

    const motionInitial = (side = `left`) => {
        const translateValue = side === `left` ? MOVE_VALUE : -MOVE_VALUE;
        let translateProps = {
            opacity: 0,
        };
        translateProps[axis] = translateValue;
        return translateProps;
    };

    const motionAnimate = (side = `left`) => {
        const translateValue = side === `left` ? MOVE_VALUE : -MOVE_VALUE;

        let translateProps = {
            opacity: isWaitAnimation ? 0 : 1,
            transition: {
                duration: 1,
                ease: "easeOut"
            },
        };
        translateProps[axis] = isWaitAnimation ? translateValue : 0;
        return translateProps;
    };

    return (
        <div className={cn(b(), `ComponentWrapper`)}>
            <div className={b(`title`)}>
                <h1>Курсы по Digital</h1>
                <h2>С дипломом государственного образца</h2>
            </div>
            <Link to="about" spy={true} smooth={true} duration={1000}>
                <div className={cn(b('about'), {scrolled: isScrolled})}>Подробнее</div>
            </Link>
            <Link to="register" spy={true} smooth={true} duration={1000}>
                <div className={cn(b('register'), {scrolled: isScrolled})}>Регистрация</div>
            </Link>
            <div className={b(`text-slider`)}>
                <div className={b(`text-slider-left`)}>
                    <div className={b(`text-slider-left-container`)}>
                        <motion.div
                            initial={motionInitial(`left`)}
                            animate={motionAnimate(`left`)}
                            className={b(`text-slider-left-container-row`)}>
                            <span className={b(`text-slider-left-container-row-content`)}>{leftText}</span>
                        </motion.div>
                    </div>
                </div>
                <div className={b(`text-slider-right`)}>
                    <div className={b(`text-slider-right-container`)}>
                        <motion.div
                            initial={motionInitial(`right`)}
                            animate={motionAnimate(`right`)}
                            className={b(`text-slider-right-container-row`)}>
                            <span className={b(`text-slider-right-container-row-content`)}>{rightText}</span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Title01;