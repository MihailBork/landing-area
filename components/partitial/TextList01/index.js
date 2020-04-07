import React from 'react';
import b_ from 'b_';

import './style.scss';

const TextList01 = ({ list, className = `TextList01` }) => {
  const b = b_.lock(className);
  return (
    <div className={b()}>
      <div className={b(`title`)}>{list.name}</div>
      <div className={b(`items`)}>
        {
                    list.items.map((item, index) => (
                      <div key={index} className={b(`items-row`)}>{item}</div>
                    ))
                }
      </div>
    </div>
  );
};

export default TextList01;
