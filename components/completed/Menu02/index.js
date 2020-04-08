import React, { useState, useEffect } from 'react';
import b_ from 'b_';
import cn from 'classnames';
import { Link } from 'react-scroll';

import { getGlobalPadding } from '../../helper';
import './style.scss';


export const b = b_.lock(`Menu02`);

const Menu02 = ({ globalPadding, innerWidth }) => {
  const [isMobile, setMobileState] = useState(false);
  const [isOpened, setOpenedState] = useState(false);

  const handleClick = () => {
    setOpenedState(!isOpened);
  };

  const handleScroll = () => {
    if (!isOpened) return;
    setOpenedState(false);
  };

  const _isMobile = innerWidth < 601;
  if (_isMobile !== isMobile) setMobileState(_isMobile);

  useEffect(() => {
    if (!process.browser) return;
    window.addEventListener(`scroll`, handleScroll);
    return () => {
      window.removeEventListener(`scroll`, handleScroll);
    };
  });

  return (
    <div className={b()} style={getGlobalPadding(globalPadding)}>
      <div className={b(`title`)}>Котельниково - земля героев</div>
      <div className={b(`menu`)}>
        <ul className={b(`menu-main`)}>
          <Link to="about" spy smooth duration={1000} offset={-50}>
            <li className={b(`menu-main-item`)}>О проекте</li>
          </Link>
          <Link to="photo" spy smooth duration={1000} offset={-50}>
            <li className={b(`menu-main-item`)}>Фото</li>
          </Link>
          <Link to="video" spy smooth duration={1000} offset={-50}>
            <li className={b(`menu-main-item`)}>Видео</li>
          </Link>
          <Link to="contacts" spy smooth duration={1000} offset={-50}>
            <li className={b(`menu-main-item`)}>Контакты</li>
          </Link>
        </ul>
        <div className={cn(b(`menu-dropdown`), { opened: isOpened })}>
          <div className={b(`menu-dropdown-button`)} onClick={handleClick}>Конкурсы</div>
          <ul className={b(`menu-dropdown-list`)}>
            <Link to="competition01" spy smooth duration={1000} offset={-50}>
              <li className={b(`menu-dropdown-list-item`)}>Конкурс детских сочинений</li>
            </Link>
            <Link to="competition02" spy smooth duration={1000} offset={-50}>
              <li className={b(`menu-dropdown-list-item`)}>Конкурс архитектурных проектов</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu02;
