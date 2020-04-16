import React from 'react';
import b_ from 'b_';

import './style.scss';

const Controls01 = ({ downloadLink, watchAction, rating }) => {
  const b = b_.lock(`Controls01`);
  return (
    <div className={b()}>
      <div className={b(`column`)}>
        <div className={b(`column-open`)}>
          <span onClick={watchAction}>Смотреть</span>
        </div>
        <div className={b(`column-download`)}>
          <a target="_blank" rel="noopener noreferer" href={downloadLink}>
            Скачать
          </a>
        </div>
      </div>
      <div className={b(`column`)}>
        <div className={b(`column-rating`)}>
          <span>{`Голосов: ${rating}`}</span>
        </div>
        <div className={b(`column-vote`)}>
          <span onClick={watchAction}>Голосовать</span>
        </div>
      </div>
    </div>
  );
};

export default Controls01;
