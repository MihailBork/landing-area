import React, {useState, useEffect} from "react";
import Title01 from "../components/Title01";
import List01 from "../components/List01";
import Features01 from "../components/Features01";
import Person01 from "../components/Person01";
import Columns01 from "../components/Columns01";
import About01 from "../components/About01";
import Form01 from "../components/Form01";
import Copyright01 from "../components/Copyright01";
import Menu01 from "../components/Menu01";

import './style.scss';

const Home = () => {
    const [isScrolled, setScrolledState] = useState(false);
    const handleScroll = () => {
        let _isScrolled = !!window.scrollY;
        if (isScrolled !== _isScrolled) {
            setScrolledState(_isScrolled);
        }
    };
    useEffect(() => {
        if (!process.browser) return;
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('keydown', handleScroll);
        };
    });

    return (
        <div className="container">
            <Menu01 isScrolled={isScrolled}/>
            <Title01 isScrolled={isScrolled}/>
            <Columns01/>
            <Person01/>
            <About01/>
            <Features01/>
            <List01/>
            <Form01/>
            <Copyright01/>
        </div>
    )
};

export default Home
