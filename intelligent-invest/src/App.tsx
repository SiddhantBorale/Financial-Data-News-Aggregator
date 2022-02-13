
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import { Container, Row ,Col } from "react-bootstrap";
import Graph from "./components/Graph";
import Info from './components/Info';
import News from './components/News';
import Searchbar from './components/Searchbar';
import Provider from './Provider';

function App() {

  const [quote, setQuote] = useState("");
  const [qupte1, setQuote1] = useState("");

  const [loading, setLoading] = useState(false);

  const setData = () => {
    setQuote(qupte1);
  }

  useEffect(() => {
    setLoading(true);
    
    if (qupte1 === "") {
      console.log("Loading false...");
      setLoading(false);
    }
    
  }, [quote]);

  return (
    <>
      <div>
        <div style={{"textAlign":"center", "paddingTop":"2%", "fontFamily": "Arial"}}><h1>Intelligent Invest</h1></div>
        <br />
          {loading ? "Please wait... Loading" : ""}
          <Provider />
      </div>
    </>
  );
}

export default App;