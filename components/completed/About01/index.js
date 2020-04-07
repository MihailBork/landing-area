import React from 'react';
import b_ from 'b_';
import cn from 'classnames';

import './style.scss';

const info = {
  title: `Об агенстве`,
  description: `Digital-агентство «Интериум» — компания с 10-летним опытом работы в PR и digital-коммуникациях. Агентство оказывает широкий спектр услуг в сферах PR и управления репутацией; занимается информационным сопровождением и маркетингом в соц.сетях, разработкой сайтов, приложений и чат-ботов; создаёт контент, видео и VR-проекты. Клиенты — как государственные корпорации, так и небольшие компании из различных сфер деятельности.`,
};

export const b = b_.lock(`About01`);

const About01 = () => (
  <div className={cn(b(), `ComponentWrapper`)}>
    <div className={b(`title`)}>
      <h1>{info.title}</h1>
    </div>
    <div className={b(`content`)}>
      <img className={b(`content-image`)} src="/images/About01/logo.png" />
      <div className={b(`content-description`)}>
        {info.description}
      </div>
    </div>
  </div>
);

export default About01;
