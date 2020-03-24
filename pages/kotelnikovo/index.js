import React, {useState, useEffect} from "react";
import Head from 'next/head';
import Title03 from "../../components/Title03";
import Gallery01 from "../../components/Gallery01";
import Works01 from "../../components/Works01";

import '../style.scss';

const Home = () => {
    const [firstTimeLoading, setFirstTimeLoadingState] = useState(true);
    const [isScrolled, setScrolledState] = useState(false);
    const handleScroll = () => {
        if (!process.browser) return;
        let _isScrolled = !!window.scrollY;
        if (isScrolled !== _isScrolled) {
            setScrolledState(_isScrolled);
        }
    };

    useEffect(() => {
        if (firstTimeLoading) {
            setFirstTimeLoadingState(false);
            handleScroll()
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    return (
        <div className="container">
            <Head>
                <title>Котельниково - земля героев</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Title03/>
            <Gallery01/>
            <Works01/>
        </div>
    )
};

export default Home
