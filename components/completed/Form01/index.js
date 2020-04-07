import React, { useState, useEffect } from 'react';
import b_ from 'b_';
import cn from 'classnames';
import { Button, TextField } from '@material-ui/core';
import { Element } from 'react-scroll';
import { api } from '../../../api';

import './style.scss';

export const b = b_.lock('Form01');

const Form01 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isClicked, setClickedState] = useState(false);
  const [isDone, setDoneState] = useState(false);
  const [isSuccess, setSuccessState] = useState(false);
  const [isAnimationActive, setAnimationActiveState] = useState(false);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  useEffect(() => {
    setAnimationActiveState(true);
    const timer = setTimeout(setAnimationActiveState, 500, false);
    return () => {
      clearTimeout(timer);
    };
  }, [isClicked]);

  const userRegister = () => {
    setClickedState(true);
    api.post('/api/register', {
      name,
      email,
      phone,
    })
      .then((response) => {
        setSuccessState(true);
      })
      .catch(() => {
        setSuccessState(false);
      })
      .then(() => {
        const delay = isAnimationActive ? 500 : 0;
        setTimeout(setDoneState, delay, true);
      });
  };
  return (
    <Element name="register">
      <div className={cn(b(), 'ComponentWrapper')}>
        <div className={b('title')}>
          <h1>Регистрация на курсы</h1>
        </div>
        <div className={b('form')}>
          <div className={cn(b('form-overlay'), { visible: isClicked })}>
            <div className={cn(b('form-overlay-loading'), { visible: isClicked && !isDone })}>
              <div className={b('form-overlay-loading-icon')}>
                <div className={b('form-overlay-loading-icon-loader')} />
              </div>
              <div className={cn(b('form-overlay-loading-text'), { visible: isClicked && isDone })}>
                Пожалуйста, подождите...
              </div>
            </div>
            <div className={cn(b('form-overlay-message'), { visible: isClicked && isDone })}>
              <img
                className={b('form-overlay-message-icon')}
                src={`/images/Form01/${isSuccess ? 'right' : 'close'}.svg`}
              />
              <div className={b('form-overlay-message-text')}>
                {isSuccess ? 'Регистрация прошла успешно' : 'Произошла ошибка во время регистрации'}
              </div>
            </div>
          </div>
          <div className={b('form-inputs')}>
            <div className={b('form-inputs-row')}>
              <TextField
                label="Имя"
                autoComplete="off"
                id="name"
                type="text"
                placeholder="Введите имя"
                className={cn(b('form-inputs-row-value'), { 'is-invalid': !name })}
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className={b('form-inputs-row')}>
              <TextField
                label="E-mail"
                autoComplete="off"
                id="email"
                type="email"
                placeholder="Введите e-mail"
                className={cn(b('form-inputs-row-value'), { 'is-invalid': !name })}
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className={b('form-inputs-row')}>
              <TextField
                label="Телефон"
                autoComplete="off"
                id="phone"
                type="phone"
                placeholder="Введите номер"
                className={cn(b('form-inputs-row-value'), { 'is-invalid': !name })}
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
          </div>
          <Button className={b('form-button')} variant="contained" color="primary" onClick={userRegister}>
            Регистрация
          </Button>
        </div>
      </div>
    </Element>
  );
};

export default Form01;
