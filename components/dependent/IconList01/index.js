import React, {useState, useEffect} from "react";
import b_ from 'b_';
import _ from 'lodash';

import './style.scss';

const Item = ({b, item, project}) => {
    let fontSize;
    const descLength = _.size(item.description);
    switch (true) {
        case descLength < 20:
            fontSize = 2; //rem
            break;
        case descLength > 20 && descLength < 40:
            fontSize = 1.8; //rem
            break;
        case descLength >= 40 && descLength < 60:
            fontSize = 1.6; //rem
            break;
        case descLength >= 60 && descLength < 80:
            fontSize = 1.4; //rem
            break;
        case descLength >= 80 && descLength < 100:
            fontSize = 1.2; //rem
            break;
        case descLength >= 100:
            fontSize = 1; //rem
            break;
    }
    return (
        <div className={b(`item`)}>
            <div className={b(`item-icon`)}>
                <img src={`/images/${project}/Features03/${item.icon}`}/>
            </div>
            <div
                className={b(`item-description`)}
                style={{fontSize: `${fontSize}rem`}}
            >
                {item.description}
            </div>
        </div>
    )
}

const IconList01 = ({items, className = `IconList01`, project}) => {
    const b = b_.lock(className);
    return (
        <div className={b()}>
            {
                items.map((item, index) => (
                    <Item key={index} b={b} item={item} project={project}/>
                ))
            }
        </div>
    )
};

export default IconList01;