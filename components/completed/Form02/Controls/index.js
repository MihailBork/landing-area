import React from 'react';
import b_ from 'b_';
import cn from 'classnames';

import './style.scss';

const b = b_.lock(`Controls`);

const Controls = (
  {
    isDisabled,
    onPreviousClick,
    onNextClick,
    onComplete,
  },
) => (
  <div className={b()}>
    {
      onPreviousClick
      && <div className={b(`previous`)} onClick={onPreviousClick}>Назад</div>
    }
    {
      onComplete
        ? <div className={cn(b(`complete`), { disabled: isDisabled })} onClick={onComplete}>Готово</div>
        : <div className={cn(b(`next`), { disabled: isDisabled })} onClick={onNextClick}>Далее</div>
    }
  </div>
);

export default Controls;
