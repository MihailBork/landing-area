import React, { useState, useEffect } from 'react';
import b_ from 'b_';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { Element } from 'react-scroll';

import VisibilitySensor from 'react-visibility-sensor';

import './style.scss';

export const b = b_.lock(`Features02`);

// @TODO Restyle this block w/o motion

const Paragraph = ({ item, pageMoveValue }) => {
  const [isShowed, setShowState] = useState(false);
  const onVisibilityChange = (isVisible) => {
    if (!isVisible || isShowed) return;
    setShowState(true);
  };
  return (
    <VisibilitySensor onChange={onVisibilityChange} partialVisibility>
      <div className={b(`paragraphs-item`)}>
        <motion.div
          animate={{
            x: isShowed ? pageMoveValue : 0,
            transition: {
              duration: 2,
            },
          }}
          className={cn(b(`paragraphs-item-gate`), `left`)}
        />
        <motion.div
          animate={{
            x: isShowed ? -pageMoveValue : 0,
            transition: {
              duration: 2,
            },
          }}
          className={cn(b(`paragraphs-item-gate`), `right`)}
        />
        <p>
          {item}
        </p>
      </div>
    </VisibilitySensor>
  );
};

const Features02 = ({ data }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const updateSize = () => {
      if (!process.browser) return;
      setWidth(window.innerWidth);
    };
    window.addEventListener(`resize`, updateSize);
    updateSize();
    return () => window.removeEventListener(`resize`, updateSize);
  }, []);
  const pageMoveValue = -(width / 2) + (width > 800 ? 30 : 20);
  return (
    <Element name="about">
      <div className={cn(b(), `ComponentWrapper`)}>
        <div className={b(`title`)}>
          <h1>О курсах</h1>
        </div>
        <div className={b(`paragraphs`)}>
          {
            data.map((item, index) => (
              <Paragraph key={index} item={item} pageMoveValue={pageMoveValue} />
            ))
          }
        </div>
      </div>
    </Element>
  );
};

export default Features02;
