import React from 'react';
import b_ from 'b_';
import _ from 'lodash';
import { Element } from 'react-scroll';
import { getGlobalPadding } from '../../helper';

import Numbers01 from '../../partitial/Numbers01';
import ImageWithText01 from '../../partitial/ImageWithText01';
import IconList01 from '../../partitial/IconList01';

import './style.scss';

export const b = b_.lock(`Features03`);


const Features03 = ({ data, globalPadding, ...props }) => (
  <Element name="about">
    <div className={b()} style={getGlobalPadding(globalPadding)}>
      <div className={b(`title`)}>Котельниково - земля героев</div>
      <Numbers01 items={_.get(data, `digitFeatures`, [])} {...props} />
      <ImageWithText01 item={_.get(data, `description`, {})} {...props} />
      <div className={b(`title`)}>Проект позволит</div>
      <IconList01 items={_.get(data, `iconFeatures`, [])} {...props} />
    </div>
  </Element>
);

export default Features03;
