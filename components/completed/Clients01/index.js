import React from 'react';
import b_ from 'b_';
import cn from 'classnames';

import './style.scss';

const b = b_.lock(`Clients01`);

/* Data structure
[`array`, `of`, `items`]
*/

const Clients01 = ({ data }) => (
  <div className={cn(b(), `ComponentWrapper`)}>
    <div className={b(`title`)}>
      <h1>Клиенты</h1>
    </div>
    <div className={b(`content`)}>
      {
        data.map((item, index) => (
          <div key={index} className={b(`content-client`)}>
            <img alt={item} className={b(`content-client-image`)} src={`/images/Clients01/${item}.png`} />
          </div>
        ))
      }
    </div>
  </div>
);

export default Clients01;
