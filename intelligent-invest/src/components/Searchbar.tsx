import React from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { MyContext, useGlobalContext } from "./SearchContext";
import {Button} from "react-bootstrap";

const Searchbar = () => {

    const {quote, setQuote} = useGlobalContext();
    const [quote1, setQuote1] = useState("");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const setData = () => {
        // MyContext = quote;
        setQuote(quote1);
    }

    return (
        <div style={{ "paddingTop": "25px" }} >
        <input style={{"width":"70%", "height":"100%"}} type="text" name="inpSearch" placeholder="Enter the stock quote here..." onChange={event => setQuote1(event.target.value)} />
        {' '} {' '}
        <Button variant="primary" onClick={setData}>Search</Button>
        </div>  
    );
}

export default Searchbar;