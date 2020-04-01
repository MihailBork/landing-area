import React, {useState, useEffect} from "react";
import b_ from 'b_';
import cn from 'classnames';
import InputFile01 from '../dependent/InputFile01';
import InputTextShort01 from '../dependent/InputTextShort01';
import InputTextLong01 from '../dependent/InputTextLong01';
import {api} from '../../api';

import './style.scss';

const ANIMATION_DURATION = 500; // ms

export const b = b_.lock(`Form02`);

const Form02 = ({closing, onClose}) => {
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState(``);
    const [about, setAbout] = useState(``);
    const [work, setWork] = useState(null);
    const [activeStep, setActiveStep] = useState(0);

    const [isFormSent, setFormSentState] = useState(false);
    const [isWaitResponse, setWaitResponseState] = useState(false);
    const [responseStatus, setResponseStatus] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);
    const [secondsToClose, setSecondsToClose] = useState(null);

    const [isWaitAnimation, setAnimationState] = useState(false);

    useEffect(() => {
        if (!isWaitAnimation) return;
        const timer = setTimeout(() => {
            setAnimationState(false);
        }, ANIMATION_DURATION);
        return () => clearTimeout(timer);
    }, [isWaitAnimation]);

    useEffect(() => {
        if (typeof secondsToClose !== `number`) return;
        if (secondsToClose === 0) {
            onClose();
            return;
        }

        const timer = setTimeout(() => {
            setSecondsToClose(secondsToClose - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [secondsToClose]);

    const onPhotoChange = (e) => setPhoto(e.target.files[0]);
    const onRemovePhoto = () => setPhoto(null);

    const onNameChange = (e) => setName(e.target.value);

    const onAboutChange = (e) => setAbout(e.target.value);

    const onWorkChange = (e) => setWork(e.target.files[0]);
    const onRemoveWork = () => setWork(null);

    const selectStep = (index) => setActiveStep(index);
    const previousStep = () => setActiveStep(activeStep - 1);
    const nextStep = () => setActiveStep(activeStep + 1);

    const sendForm = () => {
        setWaitResponseState(true);
        setFormSentState(true);

        const data = new FormData();
        data.set(`name`, name);
        data.set(`about`, about);
        data.append(`photo`, photo);
        data.append(`work`, work);
        api({
            method: 'post',
            url: 'kotelnikovo/add',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data
        })
            .then(res => {
                setResponseStatus(true);
                setResponseMessage(`Работа успешно добавлена`);
            })
            .catch(error => {
                const data = _.get(_.get(error, `response`), `data`);
                setResponseMessage(_.get(data, `message`, `Непредвиденная ошибка`));
            })
            .then(res => {
                setSecondsToClose(5);
                setWaitResponseState(false);
            });
    };

    const getItemStyle = (index) => {
        let translateValue;
        if (index < activeStep) translateValue = -500;
        if (index > activeStep) translateValue = 500;
        if (index === activeStep) translateValue = 0;
        return {
            transform: `translateX(${translateValue}px)`,
            visibility: index === activeStep ? `visible` : `hidden`,
            opacity: index === activeStep ? 1 : 0,
        };
    };

    return (
        <div className={cn(b(), {closing: closing})}>
            <div className={b(`overlay`)}/>
            <div className={b(`content`)}>
                <div className={b(`content-close`)} onClick={onClose}>
                    <div className={b(`content-close-icon`)}/>
                </div>
                <div className={cn(b(`content-form`), {hidden: isFormSent && !isWaitResponse})}>
                    <ul className={b(`content-form-list`)}>
                        <li className={cn(b(`content-form-list-row`), {active: activeStep === 0})}>1</li>
                        <li className={cn(b(`content-form-list-row`), {active: activeStep === 1})}>2</li>
                        <li className={cn(b(`content-form-list-row`), {active: activeStep === 2})}>3</li>
                        <li className={cn(b(`content-form-list-row`), {active: activeStep === 3})}>4</li>
                    </ul>
                    <div className={b(`content-form-screen`)} style={getItemStyle(0)}>
                        <InputFile01
                            id={`photo`}
                            file={photo}
                            title={`Загрузите фотографию`}
                            extensions={[`jpg`, `png`]}
                            onChange={onPhotoChange}
                            onNextClick={nextStep}
                            onRemove={onRemovePhoto}/>
                    </div>
                    <div className={b(`content-form-screen`)} style={getItemStyle(1)}>
                        <InputTextShort01
                            id={`name`}
                            element={name}
                            title={`Введите имя`}
                            onChange={onNameChange}
                            onPreviousClick={previousStep}
                            onNextClick={nextStep}/>
                    </div>
                    <div className={b(`content-form-screen`)} style={getItemStyle(2)}>
                        <InputTextLong01
                            id={`about`}
                            element={about}
                            title={`Введите описание работы`}
                            onChange={onAboutChange}
                            onPreviousClick={previousStep}
                            onNextClick={nextStep}/>
                    </div>
                    <div className={b(`content-form-screen`)} style={getItemStyle(3)}>
                        <InputFile01
                            id={`work`}
                            file={work}
                            title={`Загрузите работу`}
                            extensions={[`pdf`]}
                            onChange={onWorkChange}
                            onPreviousClick={previousStep}
                            onComplete={sendForm}
                            onRemove={onRemoveWork}/>
                    </div>
                </div>
                <div className={cn(b(`content-status`), {visible: isFormSent && !isWaitResponse})}>
                    <div className={b(`content-status-icon`)}>
                        <img src={`/icons/${responseStatus ? `check` : `close`}.svg`}/>
                    </div>
                    <div className={b(`content-status-text`)}>{responseMessage}</div>
                    <div className={b(`content-status-buttonClose`)} onClick={onClose}>{`Закрыть (${secondsToClose})`}</div>
                </div>
            </div>
        </div>
    )
};

export default Form02;