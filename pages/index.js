import React, {useState, useEffect} from "react";
import Head from 'next/head';
import Title01 from "../components/Title01";
import List01 from "../components/List01";
import Features01 from "../components/Features01";
import Features02 from "../components/Features02";
import Person01 from "../components/Person01";
import Columns01 from "../components/Columns01";
import About01 from "../components/About01";
import Form01 from "../components/Form01";
import Copyright01 from "../components/Copyright01";
import Menu01 from "../components/Menu01";
import Clients01 from "../components/Clients01";

import './style.scss';

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
                <title>Курсы по Digital от Айты Лузгиной (Интериум)</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Menu01 isScrolled={isScrolled}/>
            <Title01 isScrolled={isScrolled}/>
            <Features02/>
            <Person01/>
            <About01/>
            <Clients01/>
            <Features01/>
            <Columns01/>
            <List01/>
            <Form01/>
            <Copyright01/>
        </div>
    )
};

export default Home
