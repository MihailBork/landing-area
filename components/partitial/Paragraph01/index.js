import React from 'react';
import b_ from 'b_';

import './style.scss';

const Paragraph01 = ({ item = [], className = `Paragraph01` }) => {
  const b = b_.lock(className);
  return (
    <div className={b()}>
      <div className={b(`paragraph`)}>
        <h2>{item.name}</h2>
        <p>{item.content}</p>
      </div>
    </div>
  );
};

export default Paragraph01;
