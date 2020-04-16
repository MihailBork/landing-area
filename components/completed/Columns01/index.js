import React from 'react';
import b_ from 'b_';
import cn from 'classnames';

import './style.scss';

const b = b_.lock(`Columns01`);

/* Data structure
[
  {
    "id": "Identifier",
    "title": "Title",
    "subTitle": "Subtitle",
    "description": "Description",
    "steps": ["Array", "of", "items"]
  },
  {
    "id": "Identifier",
    "title": "Title",
    "subTitle": "Subtitle",
    "description": "Description",
    "steps": ["Array", "of", "items"]
  },
]
*/

const Columns01 = ({ data }) => (
  <div className={cn(b(), `ComponentWrapper`)}>
    <div className={b(`items`)}>
      <div className={b(`items-row`)}>
        <div className={b(`items-row-id`)}>{data[0].id}</div>
        <div className={b(`items-row-title`)}>{data[0].title}</div>
        <div className={b(`items-row-subtitle`)}>{data[0].subTitle}</div>
        {/* <div className={b(`items-row-description`)}>{list[0].description}</div> */}
        <div className={b(`items-row-steps`)}>
          <ul>
            {
              data[0].steps.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className={b(`items-row`)}>
        <div className={b(`items-row-id`)}>{data[1].id}</div>
        <div className={b(`items-row-title`)}>{data[1].title}</div>
        <div className={b(`items-row-subtitle`)}>{data[1].subTitle}</div>
        {/* <div className={b(`items-row-description`)}>{list[1].description}</div> */}
        <div className={b(`items-row-steps`)}>
          <ul>
            {
              data[1].steps.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Columns01;
