import React, { useState } from 'react';
import b_ from 'b_';
import cn from 'classnames';

import './style.scss';

export const b = b_.lock(`Title02`);

// TODO: Make this block reusable

const Title02 = () => {
  const [isTopHovered, setTopHoveredState] = useState(false);
  const [isMiddleHovered, setMiddleHoveredState] = useState(false);
  const [isBottomHovered, setBottomHoveredState] = useState(false);
  return (
    <div className={b()}>
      <div
        className={cn(b(`stripe`), `top`)}
        onMouseEnter={() => { setTopHoveredState(true); }}
        onMouseLeave={() => { setTopHoveredState(false); }}
      >
        <div className={cn(b(`stripe-baseInfo`), { visible: !isTopHovered })}>Описание 1</div>
        <div className={cn(b(`stripe-additionalInfo`), { visible: isTopHovered })}>Дескрипшн 1</div>
      </div>
      <div
        className={cn(b(`stripe`), `middle`)}
        onMouseEnter={() => { setMiddleHoveredState(true); }}
        onMouseLeave={() => { setMiddleHoveredState(false); }}
      >
        <div className={cn(b(`stripe-baseInfo`), { visible: !isMiddleHovered })}>Описание 2</div>
        <div className={cn(b(`stripe-additionalInfo`), { visible: isMiddleHovered })}>Дескрипшн 2</div>
      </div>
      <div
        className={cn(b(`stripe`), `bottom`)}
        onMouseEnter={() => { setBottomHoveredState(true); }}
        onMouseLeave={() => { setBottomHoveredState(false); }}
      >
        <div className={cn(b(`stripe-baseInfo`), { visible: !isBottomHovered })}>Описание 3</div>
        <div className={cn(b(`stripe-additionalInfo`), { visible: isBottomHovered })}>Дескрипшн 3</div>
      </div>
    </div>
  );
};

export default Title02;
