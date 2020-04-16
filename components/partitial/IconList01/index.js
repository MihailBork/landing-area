import React, { useContext } from 'react';
import b_ from 'b_';
import _ from 'lodash';
import { ProjectContext } from "models/contexts";

import './style.scss';

const Item = ({ b, item }) => {
  const projectName = useContext(ProjectContext);
  let fontSize;
  const descLength = _.size(item.description);
  switch (true) {
    case descLength < 20:
      fontSize = 2; // rem
      break;
    case descLength > 20 && descLength < 40:
      fontSize = 1.8; // rem
      break;
    case descLength >= 40 && descLength < 60:
      fontSize = 1.6; // rem
      break;
    case descLength >= 60 && descLength < 80:
      fontSize = 1.4; // rem
      break;
    case descLength >= 80 && descLength < 100:
      fontSize = 1.2; // rem
      break;
    case descLength >= 100:
      fontSize = 1; // rem
      break;
  }
  return (
    <div className={b(`item`)}>
      <div className={b(`item-icon`)}>
        <img alt={item.description} src={`/images/${projectName}/Features03/${item.icon}`} />
      </div>
      <div
        className={b(`item-description`)}
        style={{ fontSize: `${fontSize}rem` }}
      >
        {item.description}
      </div>
    </div>
  );
};

const IconList01 = ({ items, className = `IconList01` }) => {
  const b = b_.lock(className);
  return (
    <div className={b()}>
      {
                items.map((item, index) => (
                  <Item key={index} b={b} item={item} />
                ))
            }
    </div>
  );
};

export default IconList01;
