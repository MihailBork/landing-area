import React from 'react';
import b_ from 'b_';

import './style.scss';


const ImageWithText01 = ({ item, className = `ImageWithText01`, project }) => {
  const b = b_.lock(className);
  return (
    <div className={b()}>
      <div className={b(`image`)}>
        <img alt="Icon" src={`/images/${project}/${item.image}`} />
      </div>
      <div className={b(`text`)}>
        {item.text}
      </div>
    </div>
  );
};

export default ImageWithText01;
