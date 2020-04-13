import React from 'react';
import b_ from 'b_';

import './style.scss';

const CompetitionRow01 = ({ item }) => {
  const b = b_.lock(`CompetitionRow01`);
  return (
    <div className={b()}>
      <div className={b(`person`)}>
        <span className={b(`person-name`)}>{item.person}</span>
        <span className={b(`person-age`)}>{item.age}</span>
        <span className={b(`person-studyPlace`)}>{item.studyPlace}</span>
      </div>
      <div className={b(`about`)}>{item.aboutWork}</div>
    </div>
  );
};

export default CompetitionRow01;
