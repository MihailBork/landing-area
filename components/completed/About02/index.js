import React from 'react';
import b_ from 'b_';
import _ from 'lodash';

import { getGlobalPadding } from 'components/helper';

import List01 from 'components/partitial/List01';

import './style.scss';

export const b = b_.lock(`About02`);

/* Data structure:
{
  "title": "Block name",
  "description": {
    "name": "Description",
    "content": "Description text"
  },
  "goals": {
    "name": "Goals title",
    "items": [
      "Item01",
      "Item02"
    ]
  }
}
*/

const About02 = ({ data, globalPadding }) => {
  const descriptionName = _.get(data, `description.name`, `Описание`);
  const descriptionContent = _.get(data, `description.content`, `Текст описания`);
  const goalsList = _.get(data, `goals.items`, []);
  const goalsTitle = _.get(data, `goals.name`, `Цели`);

  return (
    <div className={b()} style={getGlobalPadding(globalPadding)}>
      <div className={b(`title`)}><h1>{data.title}</h1></div>
      <div className={b(`content`)}>
        <h2>{descriptionName}</h2>
        <p>{descriptionContent}</p>
        <h2>{goalsTitle}</h2>
        <List01 list={goalsList} />
      </div>
    </div>
  );
};

export default About02;
