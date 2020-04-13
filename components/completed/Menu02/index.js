import React from 'react';
import b_ from 'b_';
import { Link } from 'react-scroll';

import Dropdown01 from "components/partitial/Dropdown01";

import { getGlobalPadding } from 'components/helper';

import './style.scss';


export const b = b_.lock(`Menu02`);

const Menu02 = ({ globalPadding, dropdownItems }) => (
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
      <Dropdown01
        name="Конкурсы"
        items={dropdownItems}
        xPosition="left"
        yPosition="bottom"
      />
    </div>
  </div>
);

export default Menu02;
