import React, {useState, useEffect} from "react";
import b_ from 'b_';
import cn from 'classnames';
import {motion} from 'framer-motion';
import {Element} from 'react-scroll';

import VisibilitySensor from 'react-visibility-sensor';

import './style.scss';

const paragraphs = [
    `Приглашаем студентов и всех, кому интересен digital-PR на первую бесплатную лекцию, которая состоится 27 февраля в 18.30 по адресу: Малый Трехсвятительский пер. 8/2, стр.1, аудитория 103`,
    `Два параллельных курса, которые стартуют в мае 2020 года, разработаны лучшими специалистами-практиками агентства «Интериум» в сотрудничестве с преподавательским составом факультета коммуникаций, медиа и дизайна НИУ «Высшая школа экономики».`,
    `Во время курсов вы познакомитесь с такими важными и интересными направлениями, как репутация в сети и разработка стратегии для построения успешного бренда в интернете.`
];

export const b = b_.lock(`Features02`);

const Paragraph = ({item, pageMoveValue}) => {
    const [isShowed, setShowState] = useState(false);
    const onVisibilityChange = (isVisible) => {
        if (!isVisible || isShowed) return;
        setShowState(true);
    }
    return (
        <VisibilitySensor onChange={onVisibilityChange} partialVisibility={true}>
            <div className={b(`paragraphs-item`)}>
                <motion.div
                    animate={{
                        x: isShowed ? pageMoveValue : 0,
                        transition: {
                            duration: 2,
                        }
                    }}
                    className={cn(b(`paragraphs-item-gate`), `left`)}
                />
                <motion.div
                    animate={{
                        x: isShowed ? -pageMoveValue : 0,
                        transition: {
                            duration: 2,
                        }
                    }}
                    className={cn(b(`paragraphs-item-gate`), `right`)}
                />
                <p>
                    {item}
                </p>
            </div>
        </VisibilitySensor>
    )
};

const Features02 = () => {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const updateSize = () => {
            if (!process.browser) return;
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    const pageMoveValue = -(width / 2) + (width > 800 ? 30 : 20);
    return (
        <Element name="about">
            <div className={cn(b(), `ComponentWrapper`)}>
                <div className={b(`title`)}>
                    <h1>О курсах</h1>
                </div>
                <div className={b(`paragraphs`)}>
                    {
                        paragraphs.map((item, index) => (
                            <Paragraph key={index} item={item} pageMoveValue={pageMoveValue}/>
                        ))
                    }
                </div>
            </div>
        </Element>
    )
};

export default Features02;