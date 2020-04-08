import React from 'react';
import b_ from 'b_';

import './style.scss';

const List01 = ({ list = [], className = `List01` }) => {
  const b = b_.lock(className);
  return (
    <div className={b()}>
      <div className={b(`items`)}>
        {
          list.map((item, index) => (
            <div key={index} className={b(`items-row`)}>{item}</div>
          ))
        }
      </div>
    </div>
  );
};

export default List01;
