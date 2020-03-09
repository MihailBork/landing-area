import React from "react";
import b_ from 'b_';
import cn from 'classnames';

import './style.scss';

const info = {
    title: `Об агенстве`,
    description: `Digital-агентство «Интериум» — компания с 10-летним опытом работы в PR и digital-коммуникациях. Агентство оказывает широкий спектр услуг в сферах PR и управления репутацией; занимается информационным сопровождением и маркетингом в соц.сетях, разработкой сайтов, приложений и чат-ботов; создаёт контент, видео и VR-проекты. Клиенты — как государственные корпорации, так и небольшие компании из различных сфер деятельности.`,
};

export const b = b_.lock(`Copyright01`);

const Copyright01 = () => {
    return (
        <div className={b()}>
            <div className={b(`content`)}>
                Made by <a href={`https://vk.com/thebork`}>Mike Kutnyashenko</a>
            </div>
        </div>
    )
};

export default Copyright01;