import React, { useState } from 'react';
import b_ from 'b_';
import cn from 'classnames';

import './style.scss';

export const b = b_.lock(`Title03`);

/* Data structure (fixed 4 items)
[
  {
    title: `Title 1`,
    text: `Comment1`,
  },
  {
    title: `Title 1`,
    text: `Comment1`,
  },
  {
    title: `Title 1`,
    text: `Comment1`,
  },
  {
    title: `Title 1`,
    text: `Comment1`,
  }
];
 */

const Title03 = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const isItemSelected = typeof selectedItem === `number`;
  return (
    <div className={b()}>
      <div className={cn(b(`content`), { selected: isItemSelected })}>
        <div className={b(`content-logo`)} />
        <div className={cn(b(`content-menu`), { selected: isItemSelected })}>
          {
            data.map((item, index) => (
              <div
                key={index}
                className={cn(b(`content-menu-row`), { active: selectedItem === index })}
                onClick={() => setSelectedItem(index)}
              >
                <span className={b(`content-menu-row-text`)}>{item.title}</span>
              </div>
            ))
          }
        </div>
        <div
          className={b(`content-back`)}
          onClick={() => setSelectedItem(null)}
        >
          Назад
        </div>
        <div className={b(`content-properties`)}>
          {
            isItemSelected
            && (
              <div className={b(`content-properties-text`)}>
                {data[selectedItem].text}
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Title03;
