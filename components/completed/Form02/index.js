import React, { useState, useEffect, useContext } from 'react';
import b_ from 'b_';
import _ from 'lodash';
import cn from 'classnames';
import api from 'api';

import { ProjectContext } from "models/contexts";

import Screen from "./Screen";

import './style.scss';

const ANIMATION_DURATION = 500; // ms

const b = b_.lock(`Form02`);
/*
{
  "method": "e.g. POST, GET",
  "endpoint": "your_endpoint",
  "fields": [
    {
      "type": "text",
      "title": "Title for screen with input",
      "id": "id_for_request"
    },
    {
      "type": "textarea",
      "title": "Title for screen with input",
      "id": "id_for_request"
    },
    {
      "type": "file",
      "title": "Title for screen with input",
      "extensions": ["array", "of", "extensions"],
      "id": "id_for_request"
    }
  ]
}
 */

const Form02 = ({
  data,
  closing,
  onClose,
}) => {
  const projectName = useContext(ProjectContext);
  const fields = _.get(data, `fields`, []);
  const initialState = fields.reduce((accumulator, currentValue) => {
    accumulator[currentValue.id] = currentValue.type === `file` ? null : ``;
    return accumulator;
  }, {});

  const [form, setForm] = useState(initialState);
  const [valueFromInput, setValueFromInput] = useState(null);

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

  useEffect(() => {
    if (!valueFromInput) return;
    const [key, value] = valueFromInput;
    setForm({
      ...form,
      [key]: value,
    });
  }, [valueFromInput]);

  const previousStep = () => setActiveStep(activeStep - 1);
  const nextStep = () => setActiveStep(activeStep + 1);

  const sendForm = () => {
    setWaitResponseState(true);
    setFormSentState(true);

    const formData = new FormData();

    _.map(Object.entries(form), (item) => {
      const [key, value] = item;
      if (typeof value === `object`) {
        formData.append(key, value);
      } else {
        formData.set(key, value);
      }
    });

    api({
      method: data.method,
      url: `${projectName}/${data.endpoint}`,
      headers: {
        'Content-Type': `multipart/form-data`,
      },
      data: formData,
    })
      .then(() => {
        setResponseStatus(true);
        setResponseMessage(`Работа успешно добавлена`);
      })
      .catch((error) => {
        const errorData = _.get(_.get(error, `response`), `data`);
        setResponseMessage(_.get(errorData, `message`, `Непредвиденная ошибка`));
      })
      .then(() => {
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
    <div className={cn(b(), { closing })}>
      <div className={b(`overlay`)} />
      <div className={b(`content`)}>
        <div className={b(`content-close`)} onClick={onClose}>
          <div className={b(`content-close-icon`)} />
        </div>
        <div className={cn(b(`content-form`), { hidden: isFormSent && !isWaitResponse })}>
          <ul className={b(`content-form-list`)}>
            {
              fields.map((item, index) => (
                <li key={index} className={cn(b(`content-form-list-row`), { active: activeStep === index })}>
                  {index + 1}
                </li>
              ))
            }
          </ul>
          {
            fields.map((item, index) => (
              <div key={index} className={b(`content-form-screen`)} style={getItemStyle(index)}>
                <Screen
                  key={index}
                  element={form[item.id]}
                  setValue={setValueFromInput}
                  onPreviousClick={index !== 0 ? previousStep : null}
                  onNextClick={index !== (fields.length - 1) ? nextStep : null}
                  onComplete={index === (fields.length - 1) ? sendForm : null}
                  {...item}
                />
              </div>
            ))
          }
        </div>
        <div className={cn(b(`content-status`), { visible: isFormSent && !isWaitResponse })}>
          <div className={b(`content-status-icon`)}>
            <img alt="Icon" src={`/icons/${responseStatus ? `check` : `close`}.svg`} />
          </div>
          <div className={b(`content-status-text`)}>{responseMessage}</div>
          <div className={b(`content-status-buttonClose`)} onClick={onClose}>{`Закрыть (${secondsToClose})`}</div>
        </div>
      </div>
    </div>
  );
};

export default Form02;
