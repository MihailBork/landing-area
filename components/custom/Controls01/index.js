import React from 'react';
import b_ from 'b_';

import './style.scss';

const Controls01 = ({ downloadLink, watchAction }) => {
  const b = b_.lock(`Controls01`);
  return (
    <div className={b()}>
      <div className={b(`open`)}>
        <span onClick={watchAction}>Смотреть</span>
      </div>
      <div className={b(`download`)}>
        <a target="_blank" rel="noopener noreferer" href={downloadLink}>
          Скачать
        </a>
      </div>
      <div className={b(`vote`)}>
        <span onClick={watchAction}>Голосовать</span>
      </div>
    </div>
  );
};

export default Controls01;
