import React, {useState, useEffect} from "react";
import b_ from 'b_';
import cn from 'classnames';

import './style.scss';


export const b = b_.lock(`Menu01`);

const Menu01 = ({isScrolled}) => {


    return (
        <div className={cn(b(), {visible: isScrolled})}>
        </div>
    )
};

export default Menu01;