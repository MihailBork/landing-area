import React, { useState, useEffect } from 'react';
import b_ from 'b_';
import cn from 'classnames';
import { Link } from 'react-scroll';

import './style.scss';


export const b = b_.lock(`Menu01`);

const Menu01 = ({ isScrolled }) => {
  const [firstTimeLoading, setFirstTimeLoadingState] = useState(true);
  const [isMobile, setMobileState] = useState(false);
  const [isOpened, setOpenedState] = useState(false);

  const handleClick = () => {
    setOpenedState(!isOpened);
  };

  const updateSize = () => {
    const _isMobile = !process.browser ? false : window.innerWidth < 601;
    setMobileState(_isMobile);
    setOpenedState(false);
  };


  const closeMenu = () => {
    setOpenedState(false);
  };

  if (firstTimeLoading) {
    setFirstTimeLoadingState(false);
    updateSize();
  }

  useEffect(() => {
    window.addEventListener(`resize`, updateSize);
    return () => window.removeEventListener(`resize`, updateSize);
  }, []);

  useEffect(() => {
    window.addEventListener(`scroll`, closeMenu);
    return () => window.removeEventListener(`scroll`, closeMenu);
  }, []);


  return (
    <div className={cn(b(), { visible: isScrolled })}>
      <div className={b(`menu`)} onClick={handleClick} />
      <ul className={cn(b(`items`), { opened: (isScrolled && !isMobile) || isOpened })}>
        <Link to="speaker" spy smooth duration={1000}>
          <li>О спикере</li>
        </Link>
        <Link to="plan" spy smooth duration={1000}>
          <li>Программа курса</li>
        </Link>
      </ul>
    </div>
  );
};

export default Menu01;
