import React, { useState } from 'react';
import b_ from 'b_';
import _ from 'lodash';

import { getGlobalPadding } from 'components/helper';

import Paragraph01 from "components/partitial/Paragraph01";

import './style.scss';

export const b = b_.lock(`About03`);

// Data structure:
// {
//   "title": "Title",
//   "description": "Optional description",
//   "paragraphs": [
//     {
//       "name": "Paragraph title",
//       "content": "Paragraph content"
//     },
//     {
//       "name": "Paragraph title",
//       "content": "Paragraph content"
//     }
//   ]
// }

const About03 = ({ data, globalPadding }) => {
  const description = _.get(data, `description`);
  const paragraphs = _.get(data, `paragraphs`, []);

  const [selectedItem, setSeletedItem] = useState(0);

  return (
    <div className={b()} style={getGlobalPadding(globalPadding)}>
      <div className={b(`title`)}><h1>{data.title}</h1></div>
      <div className={b(`content`)}>
        { description && <h1>{description}</h1> }
        {
          paragraphs.map((item, index) => (
            <Paragraph01
              key={index}
              item={item}
              isOpened={index === selectedItem}
              setOpenedState={() => setSeletedItem(index)}
            />
          ))
        }
      </div>
    </div>
  );
};

export default About03;
