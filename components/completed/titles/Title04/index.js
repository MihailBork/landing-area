import React, { useRef } from 'react';
import b_ from 'b_';
import HtmlParser from 'react-html-parser';

import { getRefHeight } from 'components/helper';

import './style.scss';

const title = {
  text: `<span>Уникальный проект</span>по бренду территории<br/>"Котельниково - земля героев"`,
  image: `logo.png`,
};

const HEADER_HEIGHT = 50; // px

export const b = b_.lock(`Title04`);

const Title04 = () => {
  const logoRef = useRef(null);
  const logoHeight = getRefHeight(logoRef);

  return (
    <div className={b()} style={{ minHeight: logoHeight + HEADER_HEIGHT }}>
      <div className={b(`text`)}>{HtmlParser(title.text)}</div>
      <div className={b(`logo`)}>
        <img alt="Logo" ref={logoRef} src={`/images/kotelnikovo/${title.image}`} />
      </div>
    </div>
  );
};

export default Title04;
