import React from 'react';
import b_ from 'b_';
import _ from 'lodash';
import cn from 'classnames';

import './style.scss';

const MAX_PAGES_AROUND = 5;

const Paginator01 = ({ activePage, setPage, pagesAmount }) => {
  if (pagesAmount === 1) {
    return null;
  }

  const b = b_.lock(`Paginator01`);

  const pageButtons = [];

  let firstPage = activePage - MAX_PAGES_AROUND - 1;
  let lastPage = activePage + MAX_PAGES_AROUND;
  const additionalPagesToStart = lastPage > pagesAmount ? lastPage - pagesAmount : 0;
  const additionalPagesToEnd = firstPage < 0 ? Math.abs(firstPage) : 0;

  firstPage -= additionalPagesToStart - 1;
  lastPage += additionalPagesToEnd;

  firstPage = firstPage < 1 ? 1 : firstPage;
  lastPage = lastPage > pagesAmount ? pagesAmount : lastPage;

  for (let i = firstPage; i <= lastPage; i++) {
    pageButtons.push(i);
  }

  return (
    <div className={b()}>
      <div className={b(`navigation`)}>
        <div
          className={cn(b(`navigation-back`), { disabled: activePage === 1 })}
          onClick={() => (activePage !== 1 ? setPage(activePage - 1) : _.noop())}
        >
          Предыдущая
        </div>
        <div
          className={cn(b(`navigation-force`), { hidden: firstPage === 1 })}
          onClick={() => (setPage(activePage - MAX_PAGES_AROUND))}
        >
          ...
        </div>
        {
          pageButtons.map((item, index) => (
            <div
              key={index}
              className={cn(b(`navigation-page`), { active: activePage === item })}
              onClick={() => (activePage !== item ? setPage(item) : _.noop())}
            >
              {item}
            </div>
          ))
        }
        <div
          className={cn(b(`navigation-force`), { hidden: lastPage === pagesAmount })}
          onClick={() => (setPage(activePage + MAX_PAGES_AROUND))}
        >
          ...
        </div>
        <div
          className={cn(b(`navigation-forward`), { disabled: activePage === pagesAmount })}
          onClick={() => (activePage !== pagesAmount ? setPage(activePage + 1) : _.noop())}
        >
          Следующая
        </div>
      </div>
    </div>
  );
};

export default Paginator01;
