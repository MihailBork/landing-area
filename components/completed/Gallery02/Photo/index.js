import React, { useContext } from 'react';
import _ from "lodash";
import { ProjectContext } from "models/contexts";

import './style.scss';

const Photo = ({
  activeWidth,
  photoMargin,
  className,
  index,
  photosAmount,
  galleryWidth,
  selectedItem,
  prevPhoto,
  nextPhoto,
  item,
}) => {
  const projectName = useContext(ProjectContext);
  const isHiddenLeft = () => {
    if (selectedItem === 0) return index === photosAmount - 2;
    if (selectedItem === 1) return index === photosAmount - 1;
    return index === selectedItem - 2;
  };

  const isHiddenRight = () => {
    if (selectedItem === photosAmount - 1) return index === 1;
    if (selectedItem === photosAmount - 2) return index === 0;
    return index === selectedItem + 2;
  };

  const isSmallLeft = () => {
    if (selectedItem === 0) return index === photosAmount - 1;
    return index === selectedItem - 1;
  };

  const isSmallRight = () => {
    if (selectedItem === photosAmount - 1) return index === 0;
    return index === selectedItem + 1;
  };

  const getItemType = () => {
    if (index === selectedItem) return `active`;
    if (isSmallLeft()) return `smallLeft`;
    if (isSmallRight()) return `smallRight`;
    if (isHiddenLeft()) return `hiddenLeft`;
    if (isHiddenRight()) return `hiddenRight`;
    return `disabled`;
  };

  const itemType = getItemType();

  const getItemStyle = () => {
    let itemWidth; let itemHeight; let leftOffset; let
      topOffset;
    const onePercentPx = galleryWidth / 100;
    const activeWidthPx = onePercentPx * activeWidth;
    const activeHeightPx = activeWidthPx / 16 * 9;
    const marginPx = onePercentPx * photoMargin;
    const freePercents = 100 - activeWidth - (photoMargin * 2);
    if (itemType === `active`) {
      itemWidth = activeWidthPx;
      itemHeight = activeHeightPx;
      leftOffset = (galleryWidth - itemWidth) / 2;
      topOffset = 0;
    }
    if (itemType !== `active`) {
      itemWidth = (galleryWidth / 100 * freePercents) / 2;
      itemHeight = itemWidth / 16 * 9;
      if (itemType === `smallLeft` || itemType === `smallRight`) {
        leftOffset = itemType === `smallRight`
          ? (itemWidth + marginPx + activeWidthPx + marginPx)
          : 0;
      } else {
        leftOffset = itemType === `hiddenRight` ? (galleryWidth + 100) : (0 - itemWidth - 100);
      }
      topOffset = (activeHeightPx - itemHeight) / 2;
    }

    return {
      width: itemWidth,
      height: itemHeight,
      left: leftOffset,
      top: topOffset,
      background: `url('/images/${projectName}/Gallery02/${item}') center no-repeat`,
      backgroundSize: `cover`,
    };
  };

  const onClickFunction = () => {
    if (itemType === `smallLeft`) return prevPhoto;
    if (itemType === `smallRight`) return nextPhoto;
    return _.noop;
  };

  return (
    <>
      {
        itemType !== `disabled`
        && (
          <div
            className={className}
            style={getItemStyle()}
            onClick={onClickFunction(index)}
          />
        )
      }
    </>
  );
};

export default Photo;
