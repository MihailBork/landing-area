import React, { useState, useRef } from 'react';
import b_ from 'b_';
import _ from 'lodash';

import Photo from './Photo';

import { getRefWidth } from '../../helper';

import './style.scss';

const b = b_.lock(`Gallery02`);

const ACTIVE_WIDTH = 70; // percents
const MARGIN = 2; // percents
const OFFSET = 25; // px

/* Data structure
[`array`, `of`, `values`]
 */

const Gallery02 = ({ data, globalPadding, innerWidth }) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const blockRef = useRef(null);

  const blockWidth = getRefWidth(blockRef);
  const _offset = globalPadding || OFFSET;
  const galleryWidth = blockWidth - (_offset * 2);

  const nextPhoto = () => {
    if (selectedItem === _.size(data) - 1) {
      setSelectedItem(0);
      return;
    }
    setSelectedItem(selectedItem + 1);
  };

  const prevPhoto = () => {
    if (selectedItem === 0) {
      setSelectedItem(_.size(data) - 1);
      return;
    }
    setSelectedItem(selectedItem - 1);
  };

  const photosAmount = _.size(data);

  return (
    <div className={b()} ref={blockRef}>
      <div className={b(`title`)}>
        <h1>Фотографии</h1>
      </div>
      <div
        className={b(`gallery`)}
        style={{
          width: galleryWidth,
          height: (innerWidth / 100 * ACTIVE_WIDTH) / 16 * 9,
        }}
      >
        {
          data.map((item, index) => (
            <Photo
              key={index}
              activeWidth={ACTIVE_WIDTH}
              photoMargin={MARGIN}
              className={b(`gallery-item`)}
              item={item}
              index={index}
              photosAmount={photosAmount}
              galleryWidth={galleryWidth}
              selectedItem={selectedItem}
              prevPhoto={prevPhoto}
              nextPhoto={nextPhoto}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Gallery02;
