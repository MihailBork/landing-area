import React from 'react';
import b_ from 'b_';
import cn from 'classnames';
import { Element } from 'react-scroll';

import './style.scss';

export const b = b_.lock(`Features01`);

/* Data structure
{
  "title": "Block title",
  "items": [
    {
      "description": [
        {
          "number": 123,
          "text": "Comment for number"
        },
        {
          "number": 123,
          "text": "Comment for number"
        }
      ],
      "icon": "Icon for group"
    },
  ]
}
 */

const Features01 = ({ data }) => (
  <div className={cn(b(), `ComponentWrapper`)}>
    <div className={b(`title`)}>
      <h1>{data.title}</h1>
    </div>
    <div className={b(`items`)}>
      {
        data && data.items && data.items.map((item, index) => (
          <div key={index} className={b(`items-column`)}>
            <div className={b(`items-column-icon`)}>
              <img
                alt="Icon"
                className={b(`items-column-icon-image`)}
                src={`/images/Features01/${item.icon}.svg`}
              />
              <img
                alt="Border"
                className={cn(b(`items-column-icon-border`), `item-${index}`)}
                src="/images/Features01/round-black.png"
              />
            </div>
            <div className={b(`items-column-description`)}>
              {
                item.description.map((point, i) => (
                  <div key={i} className={b(`items-column-description-row`)}>
                    <div
                      className={b(`items-column-description-row-number`)}
                    >
                      {point.number}
                    </div>
                    <div
                      className={b(`items-column-description-row-text`)}
                    >
                      {point.text}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  </div>
);

export default Features01;
