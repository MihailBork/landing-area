import React, { useContext, useRef } from 'react';
import b_ from 'b_';
import HtmlParser from 'react-html-parser';

import { getRefHeight } from 'components/helper';

import { ProjectContext } from "models/contexts";

import './style.scss';

const HEADER_HEIGHT = 50; // px

const b = b_.lock(`Title04`);

/* Data structure
{
  "text": "Title text",
  "image": "Image file"
}
 */

const Title04 = ({ data }) => {
  const projectName = useContext(ProjectContext);

  const logoRef = useRef(null);
  const logoHeight = getRefHeight(logoRef);

  return (
    <div className={b()} style={{ minHeight: logoHeight + HEADER_HEIGHT }}>
      <div className={b(`text`)}>{HtmlParser(data.text)}</div>
      <div className={b(`logo`)}>
        <img alt="Logo" ref={logoRef} src={`/images/${projectName}/${data.image}`} />
      </div>
    </div>
  );
};

export default Title04;
