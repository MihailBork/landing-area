import React, {useState} from "react";
import b_ from 'b_';
import cn from 'classnames';

import './style.scss';

export const b = b_.lock(`Gallery01`);

const imagePrefix = `/images/Gallery01/`;

const albums = [
    {
        name: `Фотогалерея №1`,
        photos: [`001.jpg`, `002.jpg`, `003.jpg`, `004.jpg`, `005.jpg`, `006.jpg`, `007.jpg`, `008.jpg`, `009.jpg`],
    },
    {
        name: `Фотогалерея №2`,
        photos: [`003.jpg`, `004.jpg`, `005.jpg`, `006.jpg`, `007.jpg`, `008.jpg`, `009.jpg`],
    },
    {
        name: `Фотогалерея №3`,
        photos: [`005.jpg`, `006.jpg`, `007.jpg`, `008.jpg`, `009.jpg`],
    }
];

const Album = ({item, albumId, isReverse}) => {
    const [openedPhoto, setOpenedPhoto] = useState(null);
    const previousPhoto = () => {
        const newIndex = openedPhoto !== 0 ? openedPhoto - 1 : 0;
        setOpenedPhoto(newIndex);
    };
    const nextPhoto = () => {
        const newIndex = openedPhoto < (item.photos.length - 1) ? openedPhoto + 1 : openedPhoto;
        setOpenedPhoto(newIndex);
    };
    const closePhoto = () => {
        setOpenedPhoto(null);
    };

    const isPhotoSelected = typeof openedPhoto === `number`;
    return (
        <>
            <div className={cn(b(`album`), {reverse: isReverse})}>
                <div className={b(`album-title`)}>
                    <div className={b(`album-title-text`)}>
                        {item.name}
                    </div>
                </div>
                <div className={b(`album-slider`)}>
                    {
                        item.photos.map((item, index) => (
                            <div
                                key={index}
                                className={b(`album-slider-item`)}
                                onClick={() => setOpenedPhoto(index)}
                            >
                                <img src={`${imagePrefix}${item}`}/>
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                isPhotoSelected &&
                <div className={b(`imagePopup`)}>
                    <div className={b(`imagePopup-background`)} onClick={closePhoto}/>
                    <div className={b(`imagePopup-content`)}>
                        <div className={b(`imagePopup-content-iconClose`)} onClick={closePhoto}/>
                        <div className={b(`imagePopup-content-previous`)} onClick={previousPhoto}>
                            <div className={b(`imagePopup-content-previous-icon`)}/>
                        </div>
                        <div className={b(`imagePopup-content-next`)} onClick={nextPhoto}>
                            <div className={b(`imagePopup-content-next-icon`)}/>
                        </div>
                        <img src={`${imagePrefix}${albums[albumId].photos[openedPhoto]}`}/>
                    </div>
                </div>
            }
        </>
    )
}

const Gallery01 = () => {
    return (
        <div className={cn(b(), `ComponentWrapper`)}>
            <div className={b(`title`)}>
                ФОТОГРАФИИ
            </div>
            {
                albums.map((item, index) => (
                    <Album key={index} item={item} albumId={index} isReverse={index % 2 !== 0}/>
                ))
            }
        </div>
    )
};

export default Gallery01;