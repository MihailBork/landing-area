import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import _ from 'lodash';
import { Element } from 'react-scroll';

import data from 'data/kotelnikovo/data.json';

import api from 'api';

import Menu02 from 'components/completed/Menu02';
import Title04 from 'components/completed/titles/Title04';
import Gallery02 from 'components/completed/Gallery02';
import About03 from 'components/completed/About03';
import Form02 from 'components/completed/Form02';
import Footer01 from 'components/completed/Footer01';
import Works01 from 'components/completed/Works01';
import Video01 from 'components/completed/Video01';
import Features03 from 'components/completed/Features03';

import './style.scss';

const projectName = `kotelnikovo`;
const globalPadding = 50; // px

const Home = ({ works }) => {
  const [firstTimeLoading, setFirstTimeLoadingState] = useState(true);
  const [isScrolled, setScrolledState] = useState(false);
  const [innerWidth, setInnerWidth] = useState(0);
  const handleScroll = () => {
    if (!process.browser) return;
    const _isScrolled = !!window.scrollY;
    if (isScrolled !== _isScrolled) {
      setScrolledState(_isScrolled);
    }
  };

  const handleResize = () => {
    if (!process.browser) return;
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    if (firstTimeLoading) {
      setFirstTimeLoadingState(false);
      handleScroll();
      handleResize();
    }
    window.addEventListener(`resize`, handleResize);
    window.addEventListener(`scroll`, handleScroll);

    return () => {
      window.removeEventListener(`resize`, handleResize);
      window.removeEventListener(`scroll`, handleScroll);
    };
  });

  const [isFormOpened, setFormOpenedState] = useState(false);
  const [isFormCloseAnimation, setFormCloseAnimationState] = useState(false);

  const formOpen = () => setFormOpenedState(true);
  const formClose = () => {
    setFormCloseAnimationState(true);
    setFormOpenedState(false);
    setTimeout(() => {
      setFormCloseAnimationState(false);
    }, 500);
  };

  return (
    <div className="container">
      <Head>
        <title>{data.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Menu02 globalPadding={globalPadding} innerWidth={innerWidth} />
      <Title04 />
      <Features03 globalPadding={globalPadding} project={projectName} />
      {
        isFormOpened || isFormCloseAnimation
          ? <Form02 closing={isFormCloseAnimation} onClose={formClose} />
          : ``
      }
      <Gallery02 globalPadding={globalPadding} innerWidth={innerWidth} project={projectName} />
      <Video01 />
      <Element name="competition01">
        <About03 globalPadding={globalPadding} data={data.competition01} />
        <Works01 globalPadding={globalPadding} works={works} />
      </Element>
      <Element name="competition02">
        <About03 globalPadding={globalPadding} data={data.competition02} />
        <Works01 globalPadding={globalPadding} works={works} />
      </Element>
      <Element name="contacts">
        <Footer01 globalPadding={globalPadding} onButtonClick={formOpen} />
      </Element>
    </div>
  );
};

Home.getInitialProps = async () => {
  const response = await api.get(`kotelnikovo/getWorks`);

  const responseData = _.get(response, `data`, []);
  const works = _.get(responseData, `data`, []);

  return {
    works,
  };
};


export default Home;
