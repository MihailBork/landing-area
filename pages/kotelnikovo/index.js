import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import _ from 'lodash';
import { Link, Element } from 'react-scroll';

import data from 'data/kotelnikovo/data.json';

import Menu02 from 'components/completed/Menu02';
import Title04 from 'components/completed/titles/Title04';
import Gallery02 from 'components/completed/Gallery02';
import About03 from 'components/completed/About03';
import Form02 from 'components/completed/Form02';
import Footer01 from 'components/completed/Footer01';
import Works01 from 'components/custom/Works01';
import Video01 from 'components/completed/Video01';
import Features03 from 'components/completed/Features03';

import { ProjectContext } from "models/contexts";

import './style.scss';

const globalPadding = 50; // px

const Kotelnikovo = () => {
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

  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [isFormCloseAnimation, setFormCloseAnimationState] = useState(false);

  const formOpen = (value) => {
    setSelectedCompetition(value);
  };
  const formClose = () => {
    setFormCloseAnimationState(true);
    setSelectedCompetition(null);
    setTimeout(() => {
      setFormCloseAnimationState(false);
    }, 500);
  };

  const headerInfo = _.get(data, `head`, {});

  const competitions = _.get(data, `competitions`);
  const competitionsMenuDropdown = _.map(competitions, (item) => ({
    Component: Link,
    props: {
      to: item.slug,
      spy: true,
      smooth: true,
      duration: 1000,
      offset: -50,
    },
    title: item.title,
  }));
  const competitionsFooterDropdown = _.map(competitions, (item, index) => ({
    title: item.title,
    slug: item.slug,
    func: () => formOpen(index),
  }));

  const isCompetitionSelected = typeof selectedCompetition === `number`;
  const competitionForm = isCompetitionSelected && _.get(data.competitions[selectedCompetition], `form`);
  return (
    <ProjectContext.Provider value="kotelnikovo">
      <div id="kotelnikovo" className="container">
        <Head>
          <title>{headerInfo.title}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Menu02 globalPadding={globalPadding} innerWidth={innerWidth} dropdownItems={competitionsMenuDropdown} />
        <Title04 data={data.titleBlock} />
        <Features03 data={_.get(data, `features`, {})} globalPadding={globalPadding} />
        {
          isCompetitionSelected || isFormCloseAnimation
            ? <Form02 data={competitionForm} closing={isFormCloseAnimation} onClose={formClose} />
            : ``
        }
        <Element name="photo">
          <Gallery02
            data={_.get(data, `photoGallery`)}
            globalPadding={globalPadding}
            innerWidth={innerWidth}
          />
        </Element>
        <Video01 data={_.get(data, `videoGallery`)} />
        {
          _.get(data, `competitions`, []).map((item, index) => (
            <Element key={index} name={item.slug}>
              <About03 globalPadding={globalPadding} data={item} />
              <Works01 competition={item.slug} globalPadding={globalPadding} />
            </Element>
          ))
        }
        <Element name="contacts">
          <Footer01
            data={_.get(data, `footer`)}
            globalPadding={globalPadding}
            dropdownItems={competitionsFooterDropdown}
          />
        </Element>
      </div>
    </ProjectContext.Provider>
  );
};

export default Kotelnikovo;
