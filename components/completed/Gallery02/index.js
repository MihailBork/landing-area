import React, { useState, useRef } from 'react';
import b_ from 'b_';
import _ from 'lodash';
import { Element } from 'react-scroll';

import './style.scss';
import { getRefWidth } from '../../helper';

const b = b_.lock('Gallery02');

const photos = ['0001.jpg', '0002.jpg', '0003.jpg', '0004.jpg', '0005.jpg', '0006.jpg', '0007.jpg', '0008.jpg', '0009.jpg'];

const ACTIVE_WIDTH = 70; // percents
const MARGIN = 2; // percents
const OFFSET = 25; // px

const Photo = ({
  project, index, galleryWidth, selectedItem, prevPhoto, nextPhoto, item,
}) => {
  const isHiddenLeft = () => {
    if (selectedItem === 0) return index === _.size(photos) - 2;
    if (selectedItem === 1) return index === _.size(photos) - 1;
    return index === selectedItem - 2;
  };

  const isHiddenRight = () => {
    if (selectedItem === _.size(photos) - 1) return index === 1;
    if (selectedItem === _.size(photos) - 2) return index === 0;
    return index === selectedItem + 2;
  };

  const isSmallLeft = () => {
    if (selectedItem === 0) return index === _.size(photos) - 1;
    return index === selectedItem - 1;
  };

  const isSmallRight = () => {
    if (selectedItem === _.size(photos) - 1) return index === 0;
    return index === selectedItem + 1;
  };

  const getItemType = () => {
    if (index === selectedItem) return 'active';
    if (isSmallLeft()) return 'smallLeft';
    if (isSmallRight()) return 'smallRight';
    if (isHiddenLeft()) return 'hiddenLeft';
    if (isHiddenRight()) return 'hiddenRight';
    return 'disabled';
  };

  const itemType = getItemType();

  const getItemStyle = () => {
    let itemWidth; let itemHeight; let leftOffset; let
      topOffset;
    const onePercentPx = galleryWidth / 100;
    const activeWidthPx = onePercentPx * ACTIVE_WIDTH;
    const activeHeightPx = activeWidthPx / 16 * 9;
    const marginPx = onePercentPx * MARGIN;
    const freePercents = 100 - ACTIVE_WIDTH - (MARGIN * 2);
    if (itemType === 'active') {
      itemWidth = activeWidthPx;
      itemHeight = activeHeightPx;
      leftOffset = (galleryWidth - itemWidth) / 2;
      topOffset = 0;
    }
    if (itemType !== 'active') {
      itemWidth = (galleryWidth / 100 * freePercents) / 2;
      itemHeight = itemWidth / 16 * 9;
      if (itemType === 'smallLeft' || itemType === 'smallRight') {
        leftOffset = itemType === 'smallRight'
          ? (itemWidth + marginPx + activeWidthPx + marginPx)
          : 0;
      } else {
        leftOffset = itemType === 'hiddenRight' ? (galleryWidth + 100) : (0 - itemWidth - 100);
      }
      topOffset = (activeHeightPx - itemHeight) / 2;
    }

    return {
      width: itemWidth,
      height: itemHeight,
      left: leftOffset,
      top: topOffset,
      background: `url('/images/${project}/Gallery02/${item}') center no-repeat`,
      backgroundSize: 'cover',
    };
  };

  const onClickFunction = () => {
    if (itemType === 'smallLeft') return prevPhoto;
    if (itemType === 'smallRight') return nextPhoto;
    return _.noop;
  };

  return (
    <>
      {
                itemType !== 'disabled'
                && (
                <div
                  className={b('gallery-item')}
                  style={getItemStyle()}
                  onClick={onClickFunction(index)}
                />
                )
            }
    </>
  );
};

const Gallery02 = ({ globalPadding, innerWidth, project }) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const blockRef = useRef(null);

  const blockWidth = getRefWidth(blockRef);
  const _offset = globalPadding || OFFSET;
  const galleryWidth = blockWidth - (_offset * 2);

  const nextPhoto = () => {
    if (selectedItem === _.size(photos) - 1) {
      setSelectedItem(0);
      return;
    }
    setSelectedItem(selectedItem + 1);
  };

  const prevPhoto = () => {
    if (selectedItem === 0) {
      setSelectedItem(_.size(photos) - 1);
      return;
    }
    setSelectedItem(selectedItem - 1);
  };

  return (
    <Element name="photo">
      <div className={b()} ref={blockRef}>
        <div className={b('title')}>
          Фотографии
        </div>
        <div
          className={b('gallery')}
          style={{
            width: galleryWidth,
            height: (innerWidth / 100 * ACTIVE_WIDTH) / 16 * 9,
          }}
        >
          {
                        photos.map((item, index) => (
                          <Photo
                            key={index}
                            item={item}
                            index={index}
                            galleryWidth={galleryWidth}
                            selectedItem={selectedItem}
                            prevPhoto={prevPhoto}
                            nextPhoto={nextPhoto}
                            project={project}
                          />
                        ))
                    }
        </div>
      </div>
    </Element>
  );
};

export default Gallery02;
