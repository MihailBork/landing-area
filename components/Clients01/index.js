import React from "react";
import b_ from 'b_';
import cn from 'classnames';

import './style.scss';

export const b = b_.lock(`Clients01`);

const clients = [
    `autodor`, `b2b`, 'brest', `capital`, `communication`, 'documents', `e4`, `eurohim`, `fhr`, `folts`, `gbu`,
    `krasnoyarsk`, `lider`, `michelin`, `moscowbank`, `mosgortur`, `obr`, `parlament`, `psyj`, `redbull`, `renova`,
    `samolet`, `savushkin`, `sentiss`, `skolkovo`, `svzbank`, `teos`, `vdnh`, `worldbank`
];

const Clients01 = () => {
    return (
        <div className={cn(b(), `ComponentWrapper`)}>
            <div className={b(`title`)}>
                <h1>Клиенты</h1>
            </div>
            <div className={b(`content`)}>
                {
                    clients.map((item, index) => (
                        <div key={index} className={b(`content-client`)}>
                            <img className={b(`content-client-image`)} src={`/images/Clients01/${item}.png`}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default Clients01;