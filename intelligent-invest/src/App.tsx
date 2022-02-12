import React from 'react';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import { Container, Row ,Col } from "react-bootstrap";
import Graph from "./components/Graph";
import Info from './components/Info';
import News from './components/News';
import SearchBar from './components/Searchbar';

function App() {

  return (
    <>
      <div>
        <Container>
          <Row>
            <Col>
              <Graph Quote='TSLA' Time='1y'/>
            </Col>
            <Col>
              <h2>News</h2>
              <News Quote='TSLA' />
            </Col>
          </Row>
          <br />
          <h2>Info</h2>
          <Info Quote='TSLA' />
          <br />
        </Container>
      </div>
    </>
  );
}

export default App;
