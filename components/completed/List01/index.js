import React, { useState, useEffect } from 'react';
import b_ from 'b_';
import cn from 'classnames';
import { motion } from 'framer-motion';

import VisibilitySensor from 'react-visibility-sensor';

import './style.scss';

export const b = b_.lock(`List01`);

// TODO: Simplify and structure this component
const Checked = () => {
  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 1,
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={b(`items-row-mark-checked`)}
    />
  );
};

const Mark = ({ position }) => {
  const [showed, setShowed] = useState(false);
  const [shouldVisible, setShouldVisible] = useState(false);

  useEffect(() => {
    if (!shouldVisible) return;
    const delay = position * 500;
    const timer = setTimeout(() => {
      setShowed(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [shouldVisible]);

  const onChange = (isVisible) => {
    if (!isVisible) return;
    if (!shouldVisible) {
      setShouldVisible(true);
    }
  };

  return (
    <VisibilitySensor onChange={onChange}>
      <div className={cn(b(`items-row-mark`), { showed })}>
        {showed && <Checked />}
      </div>
    </VisibilitySensor>
  );
};

/* Data structure
[`Array`, `of`, `values`]
 */

const List01 = ({ data }) => (
  <div className={cn(b(), `ComponentWrapper`)}>
    <div className={b(`title`)}>
      <h1>Что вы получите после курсов?</h1>
    </div>
    <div className={b(`items`)}>
      {
        data.map((item, index) => (
          <div key={index} className={b(`items-row`)}>
            <Mark
              position={index}
            />
            <div className={b(`items-row-text`)}>{item}</div>
          </div>
        ))
      }
    </div>
  </div>
);

export default List01;
