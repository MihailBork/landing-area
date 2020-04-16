import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import _ from 'lodash';
import { Element } from "react-scroll";

import data from 'data/interium/data.json';

import Title01 from '../../components/completed/titles/Title01';
import List01 from '../../components/completed/List01';
import Features01 from '../../components/completed/Features01';
import Features02 from '../../components/completed/Features02';
import Person01 from '../../components/completed/Person01';
import Columns01 from '../../components/completed/Columns01';
import About01 from '../../components/completed/About01';
import Form01 from '../../components/completed/Form01';
import Copyright01 from '../../components/completed/Copyright01';
import Menu01 from '../../components/completed/Menu01';
import Clients01 from '../../components/completed/Clients01';

import '../style.scss';
import './style.scss';

const Home = () => {
  const [firstTimeLoading, setFirstTimeLoadingState] = useState(true);
  const [isScrolled, setScrolledState] = useState(false);
  const handleScroll = () => {
    if (!process.browser) return;
    const _isScrolled = !!window.scrollY;
    if (isScrolled !== _isScrolled) {
      setScrolledState(_isScrolled);
    }
  };

  useEffect(() => {
    if (firstTimeLoading) {
      setFirstTimeLoadingState(false);
      handleScroll();
    }
    window.addEventListener(`scroll`, handleScroll);

    return () => {
      window.removeEventListener(`scroll`, handleScroll);
    };
  });

  const headerInfo = _.get(data, `head`, {});

  return (
    <div id="interium" className="container">
      <Head>
        <title>{headerInfo.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Menu01 isScrolled={isScrolled} />
      <Title01 data={data.titleInfo} isScrolled={isScrolled} />
      <Features02 data={data.features02} />
      <Person01 data={data.person} />
      <About01 data={data.about} />
      <Clients01 data={data.clients} />
      <Element name="plan">
        <Features01 data={data.features01} />
      </Element>
      <Columns01 data={data.courses} />
      <List01 data={data.skills} />
      <Form01 />
      <Copyright01 />
    </div>
  );
};

export default Home;
