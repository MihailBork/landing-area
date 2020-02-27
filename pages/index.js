import React from "react";
import Title01 from "../components/Title01";
import List01 from "../components/List01";
import Features01 from "../components/Features01";
import Person01 from "../components/Person01";

import './style.scss';


const Home = () => (
  <div className="container">
      <Title01 />
      <Person01 />
      <Features01 />
      <List01 />
  </div>
);

export default Home
