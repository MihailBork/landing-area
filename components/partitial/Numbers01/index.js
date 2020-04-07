import React, { useState } from 'react';
import b_ from 'b_';
import Count from 'react-countup';

import VisibilitySensor from 'react-visibility-sensor';

import './style.scss';

const Number = ({ b, item }) => {
  const [isVisible, setVisibleState] = useState(false);

  const onChangeVisibility = (_isVisible) => {
    if (!_isVisible || isVisible) return;
    setVisibleState(_isVisible);
  };

  return (
    <VisibilitySensor onChange={onChangeVisibility}>
      <div className={b(`item`)}>
        {
                    item.prefix && <div className={b(`item-prefix`)}>{item.prefix}</div>
                }
        {
                    isVisible
                    && (
                    <div className={b(`item-number`)}>
                      <Count start end={item.number} />
                    </div>
                    )
                }
        {
                    item.suffix && <div className={b(`item-suffix`)}>{item.suffix}</div>
                }
        <div className={b(`item-description`)}>{item.description}</div>
      </div>
    </VisibilitySensor>
  );
};

const Numbers01 = ({ items, className = `Numbers01` }) => {
  const b = b_.lock(className);
  return (
    <div className={b()}>
      {
                items.map((item, index) => (
                  <Number key={index} item={item} b={b} />
                ))
            }
    </div>
  );
};

export default Numbers01;
