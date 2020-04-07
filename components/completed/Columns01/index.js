import React, { useState, useEffect } from 'react';
import b_ from 'b_';
import cn from 'classnames';

import './style.scss';

const list = [
  {
    id: 'План курса 1',
    title: 'СТРАТЕГИИ БРЕНД-МЕНЕДЖЕРА',
    subTitle: 'КАК СОЗДАТЬ БРЕНД В ИНТЕРНЕТЕ',
    description: 'Как создать стратегию для брендов, человека, органа власти и вообще любого продвигаемого продукта в PR и рекламе. Какие тренды 2020 года можно использовать в своих стратегиях.',
    steps: [
      'Поиск негатива. Мониторинг. Программы для работы',
      'Работа с негативом. Комментарии',
      'Работа в кризисе',
      'Агенты влияния. Кто они?',
      'Блогеризация',
      'Разбор кейсов',
    ],
  },
  {
    id: 'План курса 2',
    title: 'РЕПУТАЦИЯ В ИНТЕРНЕТЕ',
    subTitle: 'РАБОТА С НЕГАТИВОМ',
    description: 'Как находить и отрабатывать негатив в сети. Первые шаги в кризисных ситуациях на примере реальных кейсов.',
    steps: [
      'Концепция vs стратегия',
      'Зачем нужна стратегия?',
      'Как долго работает стратегия?',
      'Тренды в брендинге 2020',
      'Как использовать тренды',
      'Продвижение бренда в интернете',
      'Разбор кейсов',
    ],
  },
];

export const b = b_.lock('Columns01');

const Columns01 = () => (
  <div className={cn(b(), 'ComponentWrapper')}>
    <div className={b('items')}>
      <div className={b('items-row')}>
        <div className={b('items-row-id')}>{list[0].id}</div>
        <div className={b('items-row-title')}>{list[0].title}</div>
        <div className={b('items-row-subtitle')}>{list[0].subTitle}</div>
        {/* <div className={b(`items-row-description`)}>{list[0].description}</div> */}
        <div className={b('items-row-steps')}>
          <ul>
            {
                                list[0].steps.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))
                            }
          </ul>
        </div>
      </div>
      <div className={b('items-row')}>
        <div className={b('items-row-id')}>{list[1].id}</div>
        <div className={b('items-row-title')}>{list[1].title}</div>
        <div className={b('items-row-subtitle')}>{list[1].subTitle}</div>
        {/* <div className={b(`items-row-description`)}>{list[1].description}</div> */}
        <div className={b('items-row-steps')}>
          <ul>
            {
                                list[1].steps.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))
                            }
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Columns01;
