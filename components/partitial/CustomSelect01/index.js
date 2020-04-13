import React from 'react';
import b_ from 'b_';
import cn from 'classnames';

import './style.scss';

const CustomSelect01 = (
  {
    element,
    items,
    title,
    onChange,
    onPreviousClick,
    onNextClick,
    onComplete,
    className = `CustomSelect01`,
  },
) => {
  const b = b_.lock(className);

  return (
    <div className={b()}>
      <div className={b(`title`)}>{title}</div>
      <div className={b(`list`)}>
        {
          items.map((item, index) => (
            <div key={index} className={b(`list-item`)} onClick={onChange(item.value)}>{item.name}</div>
          ))
        }
      </div>
      <div className={b(`controls`)}>
        {
          onPreviousClick
          && <div className={b(`controls-previous`)} onClick={onPreviousClick}>Назад</div>
        }

        {
          onComplete
            ? <div className={cn(b(`controls-complete`), { disabled: !element })} onClick={onComplete}>Готово</div>
            : <div className={cn(b(`controls-next`), { disabled: !element })} onClick={onNextClick}>Далее</div>
        }
      </div>
    </div>
  );
};

export default CustomSelect01;
