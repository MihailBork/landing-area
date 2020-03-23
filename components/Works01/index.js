import React, {useState, useEffect} from "react";
import b_ from 'b_';
import cn from 'classnames';
import _ from 'lodash';
import {Link} from 'react-scroll';
import {motion} from 'framer-motion';

import './style.scss';

export const b = b_.lock(`Works01`);

const Works01 = () => {
    return (
        <div className={b()}>
            <div className={b(`title`)}>Работы участников</div>
            <div className={b(`works`)}>
                <div className={b(`works-row`)}>Сочинение по русскому языку</div>
                <div className={b(`works-row`)}>Доклад по математике</div>
                <div className={b(`works-row`)}>Реферат на свободную тему</div>
            </div>
        </div>
    )
};

export default Works01;