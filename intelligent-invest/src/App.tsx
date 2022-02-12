import React from 'react';
import { useState } from 'react';
// import { Container, Row ,Col } from "react-bootstrap";
import Graph from "./components/Graph";
import Info from './components/Info';
import News from './components/News';
import SearchBar from './components/Searchbar';

function App() {

  return (
    <>
      <div>
        <br />
        <h2>News</h2>
        <News Quote='TSLA' />
        <br />
        <h2>Info</h2>
        <Info Quote='TSLA' />
        <br />
        <h2>Graph</h2>
        <Graph Quote='TSLA' Time='1y'/>
        <br />
      </div>
    </>
  );
}

export default App;
