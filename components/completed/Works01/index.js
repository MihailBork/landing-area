import React, { useState, useEffect } from 'react';
import b_ from 'b_';
import cn from 'classnames';
import { Document, Page } from 'react-pdf';
import { getChildWorks, getArchitectWorks } from 'models/kotelnikovo/api';

import {
  getGlobalPadding,
  parseResponse,
  normalizeChildWorks,
  normalizeArchitectWorks,
} from 'components/helper';

import CompetitionRow01 from "components/custom/CompetitionRow01";
import CompetitionRow02 from "components/custom/CompetitionRow02";
import Controls01 from "components/custom/Controls01";

import './style.scss';

const filePrefix = `uploads/`;

export const b = b_.lock(`Works01`);

const Works01 = ({ competition, globalPadding }) => {
  const [works, setWorks] = useState([]);
  const [isLoading, setLoadingState] = useState(false);
  const [isError, setErrorState] = useState(false);
  const [shouldLoadingData, setShouldLoadingData] = useState(true);

  let RowComponent;
  let getData;
  let normalizeData;

  if (competition === `child`) {
    RowComponent = CompetitionRow01;
    getData = getChildWorks;
    normalizeData = normalizeChildWorks;
  } else {
    RowComponent = CompetitionRow02;
    getData = getArchitectWorks;
    normalizeData = normalizeArchitectWorks;
  }
  const fetchData = async () => {
    setLoadingState(true);
    setErrorState(false);
    try {
      const response = parseResponse({
        response: await getData(),
        normalize: normalizeData,
      });
      setWorks(response);
    } catch {
      setErrorState(true);
    }
    setLoadingState(false);
  };

  useEffect(() => {
    if (!shouldLoadingData) return;
    setShouldLoadingData(false);
    fetchData();
  }, [shouldLoadingData]);

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

  const onDocumentLoadSuccess = ({ pages }) => {
    setNumPages(pages);
  };

  return (
    <div className={b()} style={getGlobalPadding(globalPadding)}>
      <div className={b(`title`)}><h2>Работы участников</h2></div>
      <div className={b(`works`)}>
        {
          isLoading && (
            <div className={b(`works-loading`)}>
              <div className={b(`works-loading-comment`)}>Загрузка...</div>
            </div>
          )
        }
        {
          !isLoading && isError && (
            <div className={b(`works-error`)}>
              <div className={b(`works-error-comment`)}>Ошибка загрузки.</div>
              <div className={b(`works-error-reload`)} onClick={() => setShouldLoadingData(true)}>
                Попробовать снова
              </div>
            </div>
          )
        }
        {
          !isLoading && !isError && works && !works.length && (
            <div className={b(`works-empty`)}>
              <div className={b(`works-emtpy-comment`)}>Нет работ.</div>
            </div>
          )
        }
        {
          !isLoading && !isError && works && works.map((item, index) => (
            <div key={index} className={b(`works-row`)}>
              <RowComponent item={item} />
              <Controls01 watchAction={() => setSelectedWork(index)} downloadLink={filePrefix + item.work} />
            </div>
          ))
        }
      </div>
      {
        isSelectedWork
        && (
          <div className={b(`workPopup`)}>
            <div className={b(`workPopup-content`)}>
              <div className={b(`workPopup-content-controls`)}>
                <div
                  className={cn(b(`workPopup-content-controls-previous`), { disabled: pageNumber === 1 })}
                  onClick={previousPage}
                >
                  {`<`}
                </div>
                <div className={b(`workPopup-content-controls-current`)}>{`Страница ${pageNumber}`}</div>
                <div
                  className={cn(b(`workPopup-content-controls-next`), { disabled: pageNumber >= numPages })}
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
                  <Page pageNumber={pageNumber} />
                </Document>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Works01;
