import React from 'react';
import b_ from 'b_';
import cn from 'classnames';

import './style.scss';

export const b = b_.lock(`About01`);

const About01 = ({ data }) => (
  <div className={cn(b(), `ComponentWrapper`)}>
    <div className={b(`title`)}>
      <h1>{data.title}</h1>
    </div>
    <div className={b(`content`)}>
      <img alt="Logo" className={b(`content-image`)} src="/images/About01/logo.png" />
      <div className={b(`content-description`)}>
        {data.description}
      </div>
    </div>
  </div>
);

export default About01;
