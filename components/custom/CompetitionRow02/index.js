import React from 'react';
import b_ from 'b_';

import './style.scss';

const filePrefix = `uploads/`;

const CompetitionRow02 = ({ item }) => {
  const b = b_.lock(`CompetitionRow02`);
  return (
    <div className={b()}>
      <div className={b(`person`)}>
        <div className={b(`person-photo`)}>
          <div
            className={b(`person-photo-image`)}
            style={{ backgroundImage: `url('${filePrefix}${item.photo}')` }}
          />
        </div>
        <div className={b(`person-info`)}>
          <span className={b(`person-info-name`)}>{item.person}</span>
          <span className={b(`person-info-age`)}>{item.age}</span>
          <span className={b(`person-info-studyPlace`)}>{item.studyPlace}</span>
        </div>
      </div>
      <div className={b(`about`)}>{item.aboutWork}</div>
    </div>
  );
};

export default CompetitionRow02;
