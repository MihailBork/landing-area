import React, { useState } from 'react';
import b_ from 'b_';
import cn from 'classnames';
import { Element } from 'react-scroll';

import VisibilitySensor from 'react-visibility-sensor';
import HtmlParser from 'react-html-parser';

import './style.scss';

const info = {
  name: `Айта Лузгина`,
  company: `Проектный директор digital-агентства «Интериум»`,
  description: `<strong>Опыт</strong> с 2010 года руководила более чем 50 проектами в области коммуникаций и связей с общественностью.<br/><br/><strong>Клиенты</strong> ОАО «Савушкин продукт», Аэрофлот, ГК Автодор, Москомархитектура, Splat, Росатом, Росэнергоатом, Государственная дума, Агрохолдинг Московский, РАНХиГС, Ростех, ЗАО «Аквалайн», Зимняя универсиада-2019, Сентисс и др.<br/><br/>Автор серии мастер-классов о коммуникациях в социальных сетях. Спикер лекций и обучающих вебинаров, автор экспертных статей о digital.`,
};

export const b = b_.lock(`Person01`);

const Person01 = () => {
  const [isShowed, setShowedState] = useState(false);
  const onVisibilityChange = (isVisible) => {
    if (isShowed || !isVisible) return;
    setShowedState(true);
  };
  return (
    <Element name="speaker">
      <div className={cn(b(), `ComponentWrapper`, { visible: isShowed })}>
        <div className={b(`title`)}>
          <h1>Кто проводит курс?</h1>
        </div>
        <VisibilitySensor onChange={onVisibilityChange} partialVisibility>
          <div className={b(`content`)}>
            <img className={cn(b(`content-image`), { visible: isShowed })} src="images/Person01/photo.png" />
            <div className={cn(b(`content-info`), { visible: isShowed })}>
              <div className={cn(b(`content-info-name`), `row`)}>{info.name}</div>
              <div className={cn(b(`content-info-company`), `row`)}>{info.company}</div>
              <div
                className={cn(b(`content-info-description`), `row`)}
              >
                {HtmlParser(info.description)}
              </div>
            </div>
          </div>
        </VisibilitySensor>
      </div>
    </Element>
  );
};

export default Person01;
