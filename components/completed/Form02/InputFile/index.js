import React, { useState, useEffect } from 'react';
import b_ from 'b_';
import _ from 'lodash';
import cn from 'classnames';
import path from 'path';

import Controls from "../Controls";

import './style.scss';

const ANIMATION_DURATION = 500; // ms

const InputFile = (
  {
    id,
    element,
    title,
    extensions,
    setValue,
    onPreviousClick,
    onNextClick,
    onComplete,
  },
) => {
  const b = b_.lock(`InputFile`);

  const [isWaitAnimation, setAnimationState] = useState(false);

  const [isErrorAnimation, setErrorAnimationState] = useState(false);

  useEffect(() => {
    if (!isWaitAnimation) return;
    const timer = setTimeout(() => {
      setAnimationState(false);
    }, ANIMATION_DURATION);
    return () => clearTimeout(timer);
  }, [isWaitAnimation]);

  useEffect(() => {
    if (!isErrorAnimation) return;
    const timer = setTimeout(() => {
      setErrorAnimationState(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isErrorAnimation]);

  const onInputChange = (e) => {
    const inputFile = e.target.files[0];
    const fileExtension = path.extname(_.get(inputFile, `name`, `.`))
      .substr(1);

    if (!_.includes(extensions, fileExtension)) {
      setErrorAnimationState(true);
      return;
    }

    setValue([id, inputFile]);
  };

  const onRemove = () => setValue([id, null]);

  return (
    <div className={b()}>
      <div className={b(`title`)}>
        <div className={b(`title-text`)}>{title}</div>
        {
          extensions
          && (
            <div className={cn(b(`title-comment`), { error: isErrorAnimation })}>
              {`доступные форматы: ${_.split(extensions, `, `)}`}
            </div>
          )
        }
      </div>
      <div className={cn(b(`box`), { uploaded: !!element })}>
        <label htmlFor={id}>
          <div className={cn(b(`box-wrapper`), `Title`)}>
            <input id={id} className={b(`input`)} type="file" name={id} onChange={onInputChange} />
            <div className={cn(b(`box-wrapper-title`))}>Выбрать файл</div>
          </div>
        </label>
        <div className={cn(b(`box-wrapper`), `File`)}>
          <div className={cn(b(`box-wrapper-file`))}>
            <div className={cn(b(`box-wrapper-file-name`))}>{element ? element.name : ``}</div>
            <div className={cn(b(`box-wrapper-file-close`))} onClick={onRemove}>
              <div className={cn(b(`box-wrapper-file-close-icon`))} />
            </div>
          </div>
        </div>
      </div>
      <Controls
        isDisabled={!element}
        onPreviousClick={onPreviousClick}
        onNextClick={onNextClick}
        onComplete={onComplete}
      />
    </div>
  );
};

export default InputFile;
