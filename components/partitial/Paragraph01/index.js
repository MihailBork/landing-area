import React, { useState, useRef } from 'react';
import b_ from 'b_';
import _ from 'lodash';
import cn from 'classnames';

import './style.scss';

const Paragraph01 = ({ item = [], isOpened, setOpenedState, className = `Paragraph01` }) => {
  const b = b_.lock(className);

  const contentRef = useRef(null);
  const contentHeight = _.get(contentRef, `current.offsetHeight`);

  return (
    <div className={b()}>
      <div
        className={cn(b(`paragraph`), { opened: isOpened })}
      >
        <div className={b(`paragraph-title`)} onClick={() => setOpenedState(!isOpened)}>
          <h2>{item.name}</h2>
          <img src="/icons/next.svg" />
        </div>
        <div className={b(`paragraph-text`)} style={{ maxHeight: isOpened ? contentHeight : 0 }}>
          <p ref={contentRef}>{item.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Paragraph01;
