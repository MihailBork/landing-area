import React, { useEffect, useRef, useState } from 'react';
import b_ from 'b_';
import cn from 'classnames';

import './style.scss';

const InputFile01 = (
  {
    id,
    element,
    title,
    setValue,
    onPreviousClick,
    onNextClick,
    onComplete,
    className = `InputTextLong01`,
  },
) => {
  const b = b_.lock(className);

  const inputRef = useRef(null);
  const [cursor, setCursor] = useState(0);

  const onChange = (e) => {
    setCursor(e.target.selectionStart);
    setValue([id, e.target.value]);
  };

  useEffect(() => {
    inputRef.current.selectionStart = cursor;
    inputRef.current.selectionEnd = cursor;
  });

  return (
    <div className={b()}>
      <div className={b(`title`)}>{title}</div>
      <textarea ref={inputRef} onChange={onChange} value={element} className={b(`box`)} />
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

export default InputFile01;
