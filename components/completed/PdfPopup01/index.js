import React, { useState } from 'react';
import b_ from 'b_';
import cn from 'classnames';
import { Document, Page } from "react-pdf";

import './style.scss';

export const b = b_.lock(`PdfPopup01`);

const PdfPopup01 = ({ link, onClose }) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [pagesAmount, setPagesAmount] = useState(1);
  const [isDocumentLoading, setDocumentLoadingState] = useState(true);
  const [isPageLoading, setPageLoadingState] = useState(true);

  const previousPage = () => {
    setPageLoadingState(true);
    const newIndex = selectedPage > 1 ? selectedPage - 1 : selectedPage;
    setSelectedPage(newIndex);
  };

  const nextPage = () => {
    setPageLoadingState(true);
    const newIndex = selectedPage < pagesAmount ? selectedPage + 1 : selectedPage;
    setSelectedPage(newIndex);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPagesAmount(numPages);
    setDocumentLoadingState(false);
  };

  const onPageLoadSuccess = () => {
    setPageLoadingState(false);
  };

  return (
    <div className={b()}>
      <div className={cn(b(`content`), { hidden: isDocumentLoading })}>
        <div className={b(`content-controls`)}>
          <div
            className={cn(b(`content-controls-previous`), { disabled: selectedPage === 1 })}
            onClick={previousPage}
          >
            {`<`}
          </div>
          <div className={b(`content-controls-current`)}>{`Страница ${selectedPage}`}</div>
          <div
            className={cn(b(`content-controls-next`), { disabled: selectedPage >= pagesAmount })}
            onClick={() => nextPage()}
          >
            {`>`}
          </div>
          <div className={b(`content-controls-close`)} onClick={onClose}>закрыть</div>
        </div>
        <div className={cn(b(`content-pdf`), { pageLoading: isPageLoading })}>
          <Document
            file={link}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              className={b(`content-pdf-page`)}
              width={400}
              pageNumber={selectedPage}
              onLoadSuccess={onPageLoadSuccess}
            />
          </Document>
          <div className={b(`content-pdf-loading`)} />
        </div>
      </div>
    </div>
  );
};

export default PdfPopup01;
