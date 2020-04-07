import React from 'react';
import b_ from 'b_';
import { Element } from 'react-scroll';
import { getGlobalPadding } from '../../helper';

import Numbers01 from '../../partitial/Numbers01';
import ImageWithText01 from '../../partitial/ImageWithText01';
import IconList01 from '../../partitial/IconList01';

import './style.scss';

const numbers = [
  {
    number: 100,
    prefix: `более `,
    suffix: null,
    description: `мероприятий`,
  },
  {
    number: 900,
    prefix: `более `,
    suffix: null,
    description: `публикаций в СМИ`,
  },
  {
    number: 600,
    prefix: `более `,
    suffix: null,
    description: `футболок`,
  },
  {
    number: 10000,
    prefix: `более `,
    suffix: null,
    description: `приняли участие`,
  },
];

const description = {
  image: `logo-transparent.png`,
  // eslint-disable-next-line max-len
  text: `Проект отражает прошлое, настоящее и будущее Котельниковского района – уникального места силы, родины самых ярких представителей казачества Степана Разина и Емельяна Пугачева, героя Отечественной войны 1812 года Александра Землянухина, место величайшего подвига советских солдат, остановивших здесь армию Манштейна в годы Великой Отечественной войны. Котельниково уникально тем, что именно здесь реализуется самый масштабный в новейшей истории России инвестиционный проект освоения Гремячинского месторождения калийных солей.`,
};

const features = [
  {
    icon: `money.svg`,
    description: `Привлечение инвестиций`,
  },
  {
    icon: `tree.svg`,
    description: `Создание привлекательного имиджа территории`,
  },
  {
    icon: `place.svg`,
    // eslint-disable-next-line max-len
    description: `Позиционирование Котельниково, как места сосредоточения культурных, интеллектуальных и спортивных событий регионального уровня`,
  },
  {
    icon: `traveler.svg`,
    description: `Развитие туристического потенциала`,
  },
];

export const b = b_.lock(`Features03`);


const Features03 = ({ globalPadding, ...props }) => (
  <Element name="about">
    <div className={b()} style={getGlobalPadding(globalPadding)}>
      <div className={b(`title`)}>Котельниково - земля героев</div>
      <Numbers01 items={numbers} {...props} />
      <ImageWithText01 item={description} {...props} />
      <div className={b(`title`)}>Проект позволит</div>
      <IconList01 items={features} {...props} />
    </div>
  </Element>
);

export default Features03;
