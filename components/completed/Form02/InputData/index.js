import React, { useState, useRef, useEffect } from 'react';
import b_ from 'b_';
import cn from 'classnames';

import Controls from '../Controls';

import './style.scss';

const InputData = (
  {
    id,
    element,
    type,
    title,
    setValue,
    onPreviousClick,
    onNextClick,
    onComplete,
  },
) => {
  const b = b_.lock(`InputData`);
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
      {
        type === `textarea`
          ? <textarea ref={inputRef} onChange={onChange} value={element} className={cn(b(`input`), `Textarea`)} />
          : <input ref={inputRef} type="text" onChange={onChange} value={element} className={cn(b(`input`), `Text`)} />
      }
      <Controls
        isDisabled={!element}
        onPreviousClick={onPreviousClick}
        onNextClick={onNextClick}
        onComplete={onComplete}
      />
    </div>
  );
};

export default InputData;
