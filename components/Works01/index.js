import React, {useState, useEffect} from "react";
import b_ from 'b_';
import cn from 'classnames';
import {Document, Page} from 'react-pdf';

import './style.scss';

const filePrefix = `uploads/`;

export const b = b_.lock(`Works01`);

const Works01 = ({ works }) => {
    const [selectedWork, setSelectedWork] = useState(null);
    const isSelectedWork = typeof selectedWork === `number`;

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const previousPage = () => {
        const newIndex = pageNumber > 1 ? pageNumber - 1 : pageNumber;
        setPageNumber(newIndex);
    };

    const nextPage = () => {
        const newIndex = pageNumber < numPages ? pageNumber + 1 : pageNumber;
        setPageNumber(newIndex);
    };

    const closeWork = () => {
        setSelectedWork(null);
        setNumPages(null);
        setPageNumber(1);
    };

    const onDocumentLoadSuccess = ({numPages}) => {
        setNumPages(numPages);
    };

    return (
        <div className={b()}>
            <div className={b(`title`)}>Работы участников</div>
            <div className={b(`works`)}>
                {
                    works && works.map((item, index) => (
                        <div key={index} className={b(`works-row`)}>
                            <div
                                className={b(`works-row-photo`)}
                            >
                                <div
                                    className={b(`works-row-photo-image`)}
                                    style={{'backgroundImage': `url('${filePrefix}${item.photo}')`}}
                                />
                            </div>
                            <div className={b(`works-row-about`)}>
                                <span>
                                    {item.name}
                                </span>
                            </div>
                            <div className={b(`works-row-description`)}>
                                <span>
                                    {item.about}
                                </span>
                            </div>
                            <div className={b(`works-row-open`)}>
                                <span onClick={() => setSelectedWork(index)}>Смотреть</span>
                            </div>
                            <div className={b(`works-row-download`)}>
                                <a href={`${filePrefix}${item.work}`} target={`_blank`}>
                                    Скачать
                                </a>
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                isSelectedWork &&
                <div className={b(`workPopup`)}>
                    <div className={b(`workPopup-content`)}>
                        <div className={b(`workPopup-content-controls`)}>
                            <div
                                className={cn(b(`workPopup-content-controls-previous`), {disabled: pageNumber === 1})}
                                onClick={previousPage}
                            >
                                {`<`}
                            </div>
                            <div className={b(`workPopup-content-controls-current`)}>{`Страница ${pageNumber}`}</div>
                            <div
                                className={cn(b(`workPopup-content-controls-next`), {disabled: pageNumber >= numPages})}
                                onClick={nextPage}
                            >
                                {`>`}
                            </div>
                            <div className={b(`workPopup-content-controls-close`)} onClick={closeWork}>закрыть</div>
                        </div>
                        <div className={b(`workPopup-content-pdf`)}>
                            <Document
                                file={`${filePrefix}${works[selectedWork].work}`}
                                onLoadSuccess={onDocumentLoadSuccess}
                            >
                                <Page pageNumber={pageNumber}/>
                            </Document>
                        </div>
                    </div>

                </div>
            }
        </div>
    )
};

export default Works01;