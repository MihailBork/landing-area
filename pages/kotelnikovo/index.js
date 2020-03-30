import React, {useState, useEffect} from "react";
import Head from 'next/head';
import Menu02 from "../../components/Menu02";
import Title04 from "../../components/Title04";
import Gallery02 from "../../components/Gallery02";
import List02 from "../../components/List02";
import Footer01 from "../../components/Footer01";
import Video01 from "../../components/Video01";
import Features03 from "../../components/Features03";

import './style.scss';

const project = `kotelnikovo`;

const Home = () => {
    const [firstTimeLoading, setFirstTimeLoadingState] = useState(true);
    const [isScrolled, setScrolledState] = useState(false);
    const [innerWidth, setInnerWidth] = useState(0);
    const handleScroll = () => {
        if (!process.browser) return;
        let _isScrolled = !!window.scrollY;
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
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    });

    return (
        <div className="container">
            <Head>
                <title>Котельниково - земля героев</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Menu02 innerWidth={innerWidth}/>
            <Title04/>
            <Features03 project={project}/>
            <Gallery02 innerWidth={innerWidth} project={project}/>
            <Video01/>
            <List02/>
            <Footer01/>
        </div>
    )
};

export default Home
