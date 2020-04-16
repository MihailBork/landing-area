import React from 'react';
import b_ from 'b_';
import _ from 'lodash';
import cn from 'classnames';

import { getGlobalPadding } from "components/helper";

import Dropdown01 from "components/partitial/Dropdown01";

import './style.scss';

const b = b_.lock(`Footer01`);

/* Data structure
{
  "company": {
    "image": "Logo file",
    "description": "Company description"
  },
  "contacts": {
    "phone": "+12345678900",
    "phoneText": "+1 234 567 89 00",
    "address": "Company address"
  },
  "social": {
    "youtube": "social_id",
    "instagram": "social_id",
    "ok": "social_id"
  }
}
 */

const Footer01 = ({ data, globalPadding, dropdownItems }) => {
  const company = _.get(data, `company`);
  const contacts = _.get(data, `contacts`);
  const social = _.get(data, `social`);

  return (
    <div className={b()} style={getGlobalPadding(globalPadding)}>
      <div className={b(`logo`)}>
        <img
          alt={_.get(company, `description`)}
          className={b(`logo-image`)}
          src={`/images/Title03/${_.get(company, `image`)}`}
        />
        <div className={b(`logo-description`)}>{_.get(company, `description`)}</div>
      </div>
      <div className={b(`contacts`)}>
        <div className={b(`contacts-title`)}>Контакты:</div>
        <a
          className={b(`contacts-phone`)}
          href={`tel:${_.get(contacts, `phone`)}`}
          target="_blank"
        >
          {_.get(contacts, `phoneText`)}
        </a>
        <div className={b(`contacts-address`)}>{_.get(contacts, `address`)}</div>
      </div>
      <div className={b(`social`)}>
        <div className={b(`social-title`)}>Мы в соцсетях:</div>
        <div className={b(`social-links`)}>
          <a
            className={cn(b(`social-links-youtube`), `link`)}
            href={`https://youtube.com/channel/${_.get(social, `youtube`)}`}
            target="_blank"
          >
            <span className="text">Youtube</span>
          </a>
          <a
            className={cn(b(`social-links-instagram`), `link`)}
            href={`https://instagram.com/${_.get(social, `instagram`)}`}
            target="_blank"
          >
            <span className="text">Instagram</span>
          </a>
          <a
            className={cn(b(`social-links-ok`), `link`)}
            href={`https://ok.ru/profile/${_.get(social, `ok`)}`}
            target="_blank"
          >
            <span className="text">Ok</span>
          </a>
        </div>
      </div>
      <div className={b(`publish`)}>
        <Dropdown01
          name="Разместить работу"
          items={dropdownItems}
          xPosition="left"
          yPosition="top"
        />
      </div>
    </div>
  );
};

export default Footer01;
