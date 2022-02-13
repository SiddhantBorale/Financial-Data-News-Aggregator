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
              <Graph Quote='AAPL' Time='1y'/>
              <br />
              <Info Quote='AAPL' />
            </Col>
            <Col xs lg="2" style={{"paddingTop": "5%"}}>
              <h3>Latest News</h3>
              <News Quote='AAPL'/>
            </Col>
          </Row>
          <br />
        </Container>
      </div>
    </>
  );
}

export default App;
