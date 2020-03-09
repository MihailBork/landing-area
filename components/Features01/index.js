import React, {useState, useEffect} from "react";
import b_ from 'b_';
import cn from 'classnames';
import {motion} from 'framer-motion';

import VisibilitySensor from 'react-visibility-sensor';

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

const paragraphs = [
    `Разнообразный и богатый опыт постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обуславливает создание систем массового участия.`,
    `Не следует, однако забывать, что постоянный количественный рост и сфера нашей активности влечет за собой процесс внедрения и модернизации модели развития. Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обуславливает создание направлений прогрессивного развития.`,
    `Не следует, однако забывать, что постоянный количественный рост и сфера нашей активности требуют от нас анализа системы обучения кадров, соответствует насущным потребностям. Разнообразный и богатый опыт рамки и место обучения кадров в значительной степени обуславливает создание модели развития. Не следует, однако забывать, что рамки и место обучения кадров в значительной степени обуславливает создание соответствующий условий активизации.`
];

export const b = b_.lock(`Features01`);

const Paragraph = ({ item, pageMoveValue }) => {
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

const Features01 = () => {
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
        <div className={cn(b(), `ComponentWrapper`)}>
            <div className={b(`title`)}>
                <h1>Обучающая программа</h1>
                <h2>с практикой от маркетологов из MyAcademy</h2>
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
                                            <div className={b(`items-column-description-row-text`)}>{point.text}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className={b(`paragraphs`)}>
                {
                    paragraphs.map((item, index) => (
                        <Paragraph key={index} item={item} pageMoveValue={pageMoveValue} />
                    ))
                }
            </div>
        </div>
    )
};

export default Features01;