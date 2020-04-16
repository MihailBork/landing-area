import React, { useState, useEffect } from 'react';
import b_ from 'b_';
import _ from 'lodash';

import {
  getWorksCount,
  getWorksPage,
} from 'models/kotelnikovo/api';

import {
  getGlobalPadding,
  parseResponse,
  normalizeChildWorks,
  normalizeArchitectWorks,
} from 'components/helper';

import CompetitionRow01 from "components/custom/CompetitionRow01";
import CompetitionRow02 from "components/custom/CompetitionRow02";
import Controls01 from "components/custom/Controls01";
import Paginator01 from "components/partitial/Paginator01";

import './style.scss';
import PdfPopup01 from "components/completed/PdfPopup01";

const filePrefix = `uploads/`;

export const b = b_.lock(`Works01`);

const Works01 = ({ competition, globalPadding }) => {
  const [works, setWorks] = useState([]);
  const [isLoading, setLoadingState] = useState(false);
  const [isError, setErrorState] = useState(false);
  const [shouldLoadingData, setShouldLoadingData] = useState(true);

  const [selectedWork, setSelectedWork] = useState(null);
  const isSelectedWork = typeof selectedWork === `number`;

  const [pagesAmount, setPagesAmount] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const changePageNumber = (page) => {
    setPageNumber(page);
    setShouldLoadingData(true);
  };

  let RowComponent;
  let normalizeData;

  if (competition === `child`) {
    RowComponent = CompetitionRow01;
    normalizeData = normalizeChildWorks;
  } else {
    RowComponent = CompetitionRow02;
    normalizeData = normalizeArchitectWorks;
  }
  const fetchData = async (page) => {
    setLoadingState(true);
    setErrorState(false);
    try {
      const count = parseResponse({
        response: await getWorksCount({ competition }),
      });
      const _pagesAmount = _.get(count, `pagesAmount`);

      const fetchPage = _pagesAmount < page ? _pagesAmount : page;
      const response = parseResponse({
        response: await getWorksPage({ competition, page: fetchPage }),
        normalize: normalizeData,
      });
      setPagesAmount(_pagesAmount);
      setWorks(response);
    } catch {
      setErrorState(true);
    }
    setLoadingState(false);
  };

  useEffect(() => {
    if (!shouldLoadingData) return;
    setShouldLoadingData(false);
    fetchData(pageNumber);
  }, [shouldLoadingData]);

  const closeWork = () => {
    setSelectedWork(null);
  };

  const isWorksExist = works && works.length;

  return (
    <div className={b()} style={getGlobalPadding(globalPadding)}>
      <div className={b(`title`)}><h2>Работы участников</h2></div>
      <div className={b(`works`)}>
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
          !isLoading && !isError && !isWorksExist && (
            <div className={b(`works-empty`)}>
              <div className={b(`works-empty-comment`)}>Нет работ.</div>
            </div>
          )
        }
        {
          isWorksExist && (
            <div className={b(`works-controls`)}>
              <Paginator01
                activePage={pageNumber}
                pagesAmount={pagesAmount}
                setPage={changePageNumber}
              />
            </div>
          )
        }
        {
          isWorksExist && works.map((item, index) => (
            <div key={index} className={b(`works-row`)}>
              <RowComponent item={item} />
              <Controls01
                rating={item.rating}
                watchAction={() => setSelectedWork(index)}
                downloadLink={filePrefix + item.work}
              />
            </div>
          ))
        }
        {
          isLoading && (
            <div className={b(`works-loading`)}>
              <div className={b(`works-loading-comment`)}>Загрузка...</div>
            </div>
          )
        }
      </div>
      {
        isSelectedWork
        && (
          <PdfPopup01 link={`${filePrefix}${works[selectedWork].work}`} onClose={closeWork} />
        )
      }
    </div>
  );
};

export default Works01;
