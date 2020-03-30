import React, {useState} from "react";
import b_ from 'b_';
import _ from 'lodash';
import {Element} from 'react-scroll';

import './style.scss';

const b = b_.lock(`Gallery02`);

const photos = [`001.jpg`, `002.jpg`, `003.jpg`, `004.jpg`, `005.jpg`, `006.jpg`, `007.jpg`, `008.jpg`, `009.jpg`];

const ACTIVE_WIDTH = 70; // percents
const MARGIN = 2; // percents
const OFFSET = 25; //px

const Photo = ({project, index, galleryWidth, selectedItem, prevPhoto, nextPhoto, item}) => {
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
        let itemWidth, itemHeight, leftOffset, topOffset;
        const onePercentPx = galleryWidth / 100;
        const activeWidthPx = onePercentPx * ACTIVE_WIDTH;
        const activeHeightPx = activeWidthPx / 16 * 9;
        const marginPx = onePercentPx * MARGIN;
        const freePercents = 100 - ACTIVE_WIDTH - (MARGIN * 2);
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
            background: `url('/images/${project}/Gallery02/${item}') center no-repeat`,
            backgroundSize: `cover`,
        }
    };

    const onClickFunction = () => {
        if (itemType === `smallLeft`) return prevPhoto;
        if (itemType === `smallRight`) return nextPhoto;
        return _.noop;
    };

    return (
        <>
            {
                itemType !== 'disabled' &&
                <div
                    className={b(`gallery-item`)}
                    style={getItemStyle()}
                    onClick={onClickFunction(index)}
                />
            }
        </>
    )
};

const Gallery02 = ({innerWidth, project}) => {
    const [selectedItem, setSelectedItem] = useState(0);
    const galleryWidth = innerWidth - (OFFSET * 2);

    const nextPhoto = () => {
        if (selectedItem === _.size(photos) - 1) {
            setSelectedItem(0);
            return;
        }
        setSelectedItem(selectedItem + 1);
    }

    const prevPhoto = () => {
        if (selectedItem === 0) {
            setSelectedItem(_.size(photos) - 1);
            return;
        }
        setSelectedItem(selectedItem - 1);
    };

    return (
        <Element name={`photo`}>
            <div className={b()}>
                <div className={b(`title`)}>
                    Фотографии
                </div>
                <div
                    className={b(`gallery`)}
                    style={{
                        width: galleryWidth,
                        height: (innerWidth / 100 * ACTIVE_WIDTH) / 16 * 9
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
    )
};

export default Gallery02;