import React from 'react';
import _ from 'lodash';

import InputFile from '../InputFile';
import InputData from '../InputData';

import './style.scss';

const types = {
  text: InputData,
  textarea: InputData,
  file: InputFile,
};

const Screen = ({
  type,
  ...props
}) => {
  const Component = _.get(types, type);
  return (
    <Component type={type} {...props} />
  );
};

export default Screen;
