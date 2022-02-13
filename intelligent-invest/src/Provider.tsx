import React from "react";
import { useState } from "react";
import { createContext } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Graph from "./components/Graph";
import Info from "./components/Info";
import Searchbar from "./components/Searchbar";
import News from "./components/News";
import PredictGraph from "./components/PredictGraph";
import { useReducer } from "react";
import { useContext } from "react";
import { MyContext } from "./components/SearchContext";


const initialState = {
	quote: "AAPL"
}

const Provider = () => {

    const [quote, setQuote] = useState<string>("AAPL");


    return (
        <MyContext.Provider value={{quote, setQuote}}>
          <Container>
              <Row>
                  <Searchbar />
              </Row>
            <Row>
              <Col>
                <Graph Quote={quote.toString()} Time="6mo" />
                <br />
                <PredictGraph Quote={quote.toString()} />
                <br />
                <Info Quote={quote.toString()} />
              </Col>
              <Col xs lg="2" style={{"paddingTop": "5%"}}>
                <h3>Latest News</h3>
                <News Quote={quote.toString()}/>
              </Col>
            </Row>
            </Container>
            <br />
        </MyContext.Provider>
    );
};

export default Provider;