import React, { useState } from 'react';
import b_ from 'b_';
import _ from 'lodash';
import cn from 'classnames';
import { Element } from 'react-scroll';

import VisibilitySensor from 'react-visibility-sensor';
import HtmlParser from 'react-html-parser';

import './style.scss';

export const b = b_.lock(`Person01`);

/* Data structure
{
  "title": "Block title",
  "items": {
    "name": "Person name",
    "company": "Person company",
    "description": "Person description"
  }
}
 */

const Person01 = ({ data }) => {
  const [isShowed, setShowedState] = useState(false);
  const onVisibilityChange = (isVisible) => {
    if (isShowed || !isVisible) return;
    setShowedState(true);
  };

  const personInfo = _.get(data, `items`);
  return (
    <Element name="speaker">
      <div className={cn(b(), `ComponentWrapper`, { visible: isShowed })}>
        <div className={b(`title`)}>
          <h1>{_.get(data, `title`)}</h1>
        </div>
        <VisibilitySensor onChange={onVisibilityChange} partialVisibility>
          <div className={b(`content`)}>
            <img
              alt="Speaker"
              className={cn(b(`content-image`), { visible: isShowed })}
              src="images/Person01/photo.png"
            />
            <div className={cn(b(`content-info`), { visible: isShowed })}>
              <div className={cn(b(`content-info-name`), `row`)}>{personInfo.name}</div>
              <div className={cn(b(`content-info-company`), `row`)}>{personInfo.company}</div>
              <div
                className={cn(b(`content-info-description`), `row`)}
              >
                {HtmlParser(personInfo.description)}
              </div>
            </div>
          </div>
        </VisibilitySensor>
      </div>
    </Element>
  );
};

export default Person01;
