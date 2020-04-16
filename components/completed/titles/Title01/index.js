import React, { useState, useEffect } from 'react';
import b_ from 'b_';
import _ from 'lodash';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

import './style.scss';
import cn from 'classnames';

const MOVE_VALUE = 20;

const b = b_.lock(`Title01`);

// TODO: Add local event listener and simplify animation

/* Data structure
{
  "title": "Main title",
  "subTitle": "Subtitle",
  "items": [
    {
      "title": "First part of text",
      "description": "Second part of text"
    },
    {
      "title": "First part of text",
      "description": "Second part of text"
    }
  ]
}
 */

const Title01 = ({ data, isScrolled }) => {
  const [count, setCount] = useState(0);
  const [isWaitAnimation, setIsWaitAnimation] = useState(false);
  const isPortrait = process.browser ? window.innerWidth < window.innerHeight : false;

  const title = _.get(data, `title`);
  const subTitle = _.get(data, `subTitle`);
  const information = _.get(data, `items`);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaitAnimation(true);
    }, 5000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (!isWaitAnimation) return;
    const timer = setTimeout(() => {
      setCount(_.size(information) > count + 1 ? count + 1 : 0);
      setIsWaitAnimation(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isWaitAnimation]);
  const leftText = information[count].title;
  const rightText = information[count].description;
  const axis = isPortrait ? `x` : `y`;

  const motionInitial = (side = `left`) => {
    const translateValue = side === `left` ? MOVE_VALUE : -MOVE_VALUE;
    const translateProps = {
      opacity: 0,
    };
    translateProps[axis] = translateValue;
    return translateProps;
  };

  const motionAnimate = (side = `left`) => {
    const translateValue = side === `left` ? MOVE_VALUE : -MOVE_VALUE;

    const translateProps = {
      opacity: isWaitAnimation ? 0 : 1,
      transition: {
        duration: 1,
        ease: `easeOut`,
      },
    };
    translateProps[axis] = isWaitAnimation ? translateValue : 0;
    return translateProps;
  };

  return (
    <div className={cn(b(), `ComponentWrapper`)}>
      <div className={b(`title`)}>
        <h1>{title}</h1>
        { subTitle && <h2>{subTitle}</h2> }
      </div>
      <Link to="about" spy smooth duration={1000}>
        <div className={cn(b(`about`), { scrolled: isScrolled })}>Подробнее</div>
      </Link>
      <Link to="register" spy smooth duration={1000}>
        <div className={cn(b(`register`), { scrolled: isScrolled })}>Регистрация</div>
      </Link>
      <div className={cn(b(`text-slider`), { portrait: isPortrait })}>
        <div className={b(`text-slider-left`)}>
          <div className={b(`text-slider-left-container`)}>
            <motion.div
              initial={motionInitial(`left`)}
              animate={motionAnimate(`left`)}
              className={b(`text-slider-left-container-row`)}
            >
              <span className={b(`text-slider-left-container-row-content`)}>{leftText}</span>
            </motion.div>
          </div>
        </div>
        <div className={b(`text-slider-right`)}>
          <div className={b(`text-slider-right-container`)}>
            <motion.div
              initial={motionInitial(`right`)}
              animate={motionAnimate(`right`)}
              className={b(`text-slider-right-container-row`)}
            >
              <span className={b(`text-slider-right-container-row-content`)}>{rightText}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title01;
