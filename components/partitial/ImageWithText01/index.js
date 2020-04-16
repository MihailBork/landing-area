import React, { useContext } from 'react';
import b_ from 'b_';

import { ProjectContext } from "models/contexts";

import './style.scss';

const ImageWithText01 = ({ item, className = `ImageWithText01` }) => {
  const b = b_.lock(className);
  const projectName = useContext(ProjectContext);
  return (
    <div className={b()}>
      <div className={b(`image`)}>
        <img alt="Icon" src={`/images/${projectName}/${item.image}`} />
      </div>
      <div className={b(`text`)}>
        {item.text}
      </div>
    </div>
  );
};

export default ImageWithText01;
