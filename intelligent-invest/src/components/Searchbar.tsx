import React from "react";
import { useState } from "react";

const SearchBar = () => {

   const [quote, setQuote] = useState("");

    return (
        <>
            <input type="text" name="inpSearch" placeholder="Enter the stock quote here..." onChange={(e) => {setQuote(e.target.value); console.log(quote)}} />
        </>
    );
}

export default SearchBar;