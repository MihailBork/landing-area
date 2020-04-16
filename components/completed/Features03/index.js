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

/* Data structure
{
  "title": "Block title",
  "items": {
    "digitFeatures": [
      {
        "number": 112,
        "prefix": "prefix or null ",
        "suffix": " suffix or null",
        "description": "Number description"
      },
      {
        "number": 112,
        "prefix": "prefix or null ",
        "suffix": " suffix or null",
        "description": "Number description"
      }
    ],
    "description": {
      "image": "Main area logo",
      "text": "Main area text"
    },
    "iconFeatures": [
      {
        "icon": "Icon filename",
        "description": "Icon escription"
      },
      {
        "icon": "Icon filename",
        "description": "Icon escription"
      }
    ]
  }
}
 */

const Features03 = ({ data, globalPadding, ...props }) => (
  <Element name="about">
    <div className={b()} style={getGlobalPadding(globalPadding)}>
      <h1>{_.get(data, `title`)}</h1>
      <Numbers01 items={_.get(data, `items.digitFeatures`, [])} {...props} />
      <ImageWithText01 item={_.get(data, `items.description`, {})} {...props} />
      <h1>Проект позволит</h1>
      <IconList01 items={_.get(data, `items.iconFeatures`, [])} {...props} />
    </div>
  </Element>
);

export default Features03;
