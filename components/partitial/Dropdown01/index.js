import React, { useEffect, useState, useRef } from 'react';
import b_ from 'b_';
import _ from 'lodash';
import cn from 'classnames';
import { Link } from 'react-scroll';

import './style.scss';

const Row = ({ b, item }) => {
  const Component = _.get(item, `Component`);
  const props = _.get(item, `props`);
  const func = _.get(item, `func`);

  const title = <li className={b(`list-item`)}>{item.title}</li>;
  if (Component) {
    return <Component {...props}>{title}</Component>;
  }

  return (
    <>
      {func
        ? <div onClick={() => (func ? func() : _.noop)}>{title}</div>
        : (
          <Link to={item.slug} spy smooth duration={1000} offset={-50}>
            {title}
          </Link>
        )}
    </>
  );
};

const Dropdown01 = ({
  name,
  items = [],
  xPosition = `left`,
  yPosition = `bottom`,
  className = `Dropdown01`,
}) => {
  const b = b_.lock(className);

  const listRef = useRef(null);
  const listBlock = _.get(listRef, `current`, {});
  const listHeight = _.get(listBlock, `offsetHeight`, 0);

  const [isOpened, setOpenedState] = useState(false);

  const handleClick = () => {
    setOpenedState(!isOpened);
  };

  const handleScroll = () => {
    if (!isOpened) return;
    setOpenedState(false);
  };

  useEffect(() => {
    if (!process.browser) return;
    window.addEventListener(`scroll`, handleScroll);
    return () => {
      window.removeEventListener(`scroll`, handleScroll);
    };
  });
  return (
    <div className={cn(b(), {
      opened: isOpened,
      leftBottom: xPosition === `left` && yPosition === `bottom`,
      rightBottom: xPosition === `right` && yPosition === `bottom`,
      leftTop: xPosition === `left` && yPosition === `top`,
      rightTop: xPosition === `right` && yPosition === `top`,
    })}
    >
      <div className={b(`button`)} onClick={handleClick}>{name}</div>
      <ul ref={listRef} className={b(`list`)} style={yPosition === `top` ? { top: `-${listHeight}px` } : {}}>
        {
          items.map((item, index) => (
            <Row key={index} b={b} item={item} />
          ))
        }
      </ul>
    </div>
  );
};

export default Dropdown01;
