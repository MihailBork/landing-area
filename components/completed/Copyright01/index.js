import React from 'react';
import b_ from 'b_';

import './style.scss';

export const b = b_.lock(`Copyright01`);

const Copyright01 = () => (
  <div className={b()}>
    <div className={b(`content`)}>
      Made by
      {` `}
      <a target="_blank" rel="noopener noreferrer" href="https://vk.com/thebork">Mike Kutnyashenko</a>
    </div>
  </div>
);

export default Copyright01;
