import React, {useState, useEffect} from "react";
import b_ from 'b_';
import _ from 'lodash'
import cn from 'classnames';
import path from 'path';

import './style.scss';

const ANIMATION_DURATION = 500; //ms

const InputFile01 = (
    {
        id,
        file,
        title,
        extensions,
        onChange,
        onRemove,
        onPreviousClick,
        onNextClick,
        onComplete,
        className = `InputFile01`
    }
) => {
    const b = b_.lock(className);

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
        const file = e.target.files[0];
        const fileExtension = path.extname(_.get(file, `name`, `.`)).substr(1);

        if (!_.includes(extensions, fileExtension)) {
            setErrorAnimationState(true);
            return;
        }

        onChange(e);
    };

    return (
        <div className={b()}>
            <div className={b(`title`)}>
                <div className={b(`title-text`)}>{title}</div>
                {
                    extensions &&
                    <div className={cn(b(`title-comment`), {error: isErrorAnimation})}>
                        {`доступные форматы: ${_.split(extensions, ', ')}`}
                    </div>
                }
            </div>
            <div className={cn(b(`box`), {uploaded: !!file})}>
                <label htmlFor={id}>
                    <div className={cn(b(`box-wrapper`), `Title`)}>
                        <input id={id} className={b(`input`)} type={`file`} name={id} onChange={onInputChange}/>
                        <div className={cn(b(`box-wrapper-title`))}>Выбрать файл</div>
                    </div>
                </label>
                <div className={cn(b(`box-wrapper`), `File`)}>
                    <div className={cn(b(`box-wrapper-file`))}>
                        <div className={cn(b(`box-wrapper-file-name`))}>{file ? file.name : ``}</div>
                        <div className={cn(b(`box-wrapper-file-close`))} onClick={onRemove}>
                            <div className={cn(b(`box-wrapper-file-close-icon`))}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={b(`controls`)}>
                {
                    onPreviousClick &&
                    <div className={b(`controls-previous`)} onClick={onPreviousClick}>Назад</div>
                }

                {
                    onComplete
                        ? <div className={cn(b(`controls-complete`), {disabled: !file})}
                               onClick={file ? onComplete : null}>Готово</div>
                        : <div className={cn(b(`controls-next`), {disabled: !file})}
                               onClick={file ? onNextClick : null}>Далее</div>
                }
            </div>
        </div>
    )
};

export default InputFile01;