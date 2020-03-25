import React, {useState} from "react";
import b_ from 'b_';
import cn from 'classnames';

import './style.scss';

export const b = b_.lock(`Title03`);

const items = [
    {
        title: `Описание конкурса`,
        text: `Здесь будет подробная информация по разделу.`
    },
    {
        title: `Условия участия`,
        text: `Здесь будет подробная информация по разделу.`
    },
    {
        title: `Сроки и дополнительная инфомрация`,
        text: `Здесь будет подробная информация по разделу.`
    },
    {
        title: `Жюри`,
        text: `Здесь будет подробная информация по разделу.`,
    }
];

const Title03 = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const isItemSelected = typeof selectedItem === `number`;
    return (
        <div className={b()}>
            <div className={cn(b(`content`), {selected: isItemSelected})}>
                <div className={b(`content-logo`)}/>
                <div className={cn(b(`content-menu`), {selected: isItemSelected})}>
                        {
                            items.map((item, index) => (
                                <div
                                    key={index}
                                    className={cn(b(`content-menu-row`), {active: selectedItem === index})}
                                    onClick={() => setSelectedItem(index)}
                                >
                                    <span className={b(`content-menu-row-text`)}>{item.title}</span>
                                </div>
                            ))
                        }
                </div>
                <div
                    className={b(`content-back`)}
                    onClick={() => setSelectedItem(null)}
                >
                    Назад
                </div>
                <div className={b(`content-properties`)}>
                    {
                        isItemSelected &&
                        <div className={b(`content-properties-text`)}>
                            {items[selectedItem].text}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default Title03;