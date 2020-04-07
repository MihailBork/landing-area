import React, { useState, useEffect } from 'react';
import b_ from 'b_';
import cn from 'classnames';
import _ from 'lodash';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

import './style.scss';

export const b = b_.lock('Title02');

const Title02 = () => {
  const [isTopHovered, setTopHoveredState] = useState(false);
  const [isMiddleHovered, setMiddleHoveredState] = useState(false);
  const [isBottomHovered, setBottomHoveredState] = useState(false);
  return (
    <div className={b()}>
      <div
        className={cn(b('stripe'), 'top')}
        onMouseEnter={() => { setTopHoveredState(true); }}
        onMouseLeave={() => { setTopHoveredState(false); }}
      >
        <div className={cn(b('stripe-baseInfo'), { visible: !isTopHovered })}>Котельниково</div>
        <div className={cn(b('stripe-additionalInfo'), { visible: isTopHovered })}>Город с многолетней историей</div>
      </div>
      <div
        className={cn(b('stripe'), 'middle')}
        onMouseEnter={() => { setMiddleHoveredState(true); }}
        onMouseLeave={() => { setMiddleHoveredState(false); }}
      >
        <div className={cn(b('stripe-baseInfo'), { visible: !isMiddleHovered })}>Родина героев</div>
        <div className={cn(b('stripe-additionalInfo'), { visible: isMiddleHovered })}>Город знаменит своими талантами</div>
      </div>
      <div
        className={cn(b('stripe'), 'bottom')}
        onMouseEnter={() => { setBottomHoveredState(true); }}
        onMouseLeave={() => { setBottomHoveredState(false); }}
      >
        <div className={cn(b('stripe-baseInfo'), { visible: !isBottomHovered })}>Сайд-проект компании ЕвроХим</div>
        <div className={cn(b('stripe-additionalInfo'), { visible: isBottomHovered })}>Один или несколько тезисов из этого блока можно будет заменить, также каждый из них при нажатии будет являться ссылкой на более полное описание</div>
      </div>
    </div>
  );
};

export default Title02;
