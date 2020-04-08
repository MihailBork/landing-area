import React from 'react';
import b_ from 'b_';
import cn from 'classnames';

import { getGlobalPadding } from "components/helper";

import './style.scss';

const logo = {
  image: `logo.png`,
  description: `Котельниково - земля героев`,
};

const contacts = {
  phone: `+71111111111`,
  phoneText: `+7(111)111-11-11`,
  address: `г. Котельниково, ул. Ленина, д. 1`,
};

const social = {
  youtube: `UCO413lqNYA0f9kYC_nPjVOw`,
  instagram: `geroi_kotelnikovo`,
  ok: `576392963794`,
};


export const b = b_.lock(`Footer01`);

const Footer01 = ({ globalPadding, onButtonClick }) => (
  <div className={b()} style={getGlobalPadding(globalPadding)}>
    <div className={b(`logo`)}>
      <img alt={logo.description} className={b(`logo-image`)} src={`/images/Title03/${logo.image}`} />
      <div className={b(`logo-description`)}>{logo.description}</div>
    </div>
    <div className={b(`contacts`)}>
      <div className={b(`contacts-title`)}>Контакты:</div>
      <a
        className={b(`contacts-phone`)}
        href={`tel:${contacts.phone}`}
        target="_blank"
      >
        {contacts.phoneText}
      </a>
      <div className={b(`contacts-address`)}>{contacts.address}</div>
    </div>
    <div className={b(`social`)}>
      <div className={b(`social-title`)}>Мы в соцсетях:</div>
      <div className={b(`social-links`)}>
        <a
          className={cn(b(`social-links-youtube`), `link`)}
          href={`https://youtube.com/channel/${social.youtube}`}
          target="_blank"
        >
          <span className="text">Youtube</span>
        </a>
        <a
          className={cn(b(`social-links-instagram`), `link`)}
          href={`https://instagram.com/${social.instagram}`}
          target="_blank"
        >
          <span className="text">Instagram</span>
        </a>
        <a
          className={cn(b(`social-links-ok`), `link`)}
          href={`https://ok.ru/profile/${social.ok}`}
          target="_blank"
        >
          <span className="text">Ok</span>
        </a>
      </div>
    </div>
    <div className={b(`publish`)}>
      <div className={b(`publish-button`)} onClick={onButtonClick}>Разместить работу</div>
    </div>
  </div>
);

export default Footer01;
