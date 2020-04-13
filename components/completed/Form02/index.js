import React, { useState, useEffect, useReducer } from 'react';
import b_ from 'b_';
import _ from 'lodash';
import cn from 'classnames';
import api from 'api';

import InputFile01 from 'components/partitial/InputFile01';
import InputTextShort01 from 'components/partitial/InputTextShort01';
import InputTextLong01 from 'components/partitial/InputTextLong01';

import './style.scss';

const ANIMATION_DURATION = 500; // ms

export const b = b_.lock(`Form02`);

const types = {
  text: InputTextShort01,
  textarea: InputTextLong01,
  file: InputFile01,
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case `update`:
      return {
        ...state,
        [payload[0]]: payload[1],
      };
    default:
      return state;
  }
}

const Screen = ({
  id,
  type,
  setValueToSet: setValue,
  ...props
}) => {
  const Component = _.get(types, type);
  return (
    <Component id={id} setValue={setValue} {...props} />
  );
};

const Form02 = ({
  data,
  closing,
  project,
  onClose,
}) => {
  const fields = _.get(data, `fields`, []);
  const initialState = {};
  fields.map((item) => {
    initialState[item.id] = item.type === `file` ? null : ``;
    return null;
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  const [valueToSet, setValueToSet] = useState(null);

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
    if (!valueToSet) return;
    dispatch({
      type: `update`,
      payload: valueToSet,
    });
  }, [valueToSet]);

  const previousStep = () => setActiveStep(activeStep - 1);
  const nextStep = () => setActiveStep(activeStep + 1);

  const sendForm = () => {
    setWaitResponseState(true);
    setFormSentState(true);

    const formData = new FormData();

    _.map(Object.entries(state), (item) => {
      const [key, value] = item;
      if (typeof value === `object`) {
        formData.append(key, value);
      } else {
        formData.set(key, value);
      }
    });

    api({
      method: data.method,
      url: `${project}/${data.endpoint}`,
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
                  element={state[item.id]}
                  setValue={setValueToSet}
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
