import React, { useEffect, useState } from "react";
import { useRef } from "react";
import './Styles.css';
import { LinkPreview } from '@dhaiwat10/react-link-preview';


interface stockInfo { 
    Sector: string,
    Website: string,
    Industry: string,
    ProfitMargin: string,
    GrossMargin: string,
    ReturnOnAssets: string,
    TotalCash: String,
    TotalDebt: String,
    TotalRevenue: String,
    LongName: String
};

interface stockData {
    Open: Array<number>,
    High: Array<number>,
    Low: Array<number>,
    Close: Array<number>,
    Splits: Array<number>,
};

interface stockNews {
    Titles: Array<string>,
    Sources: Array<string>
};

interface news {
    StockInfo: stockInfo,
    StockData: stockData,
    StockNews: stockNews
};

interface props {
    Quote: string
};

const News = (props: props) => {

    const [stockData, setStockData] = useState<news | any>();
    const [loadedData, setLoadedData] = useState(false);

    const fetchData = async() => {
        const data = new FormData();
        data.append("quote", props.Quote);
        
        const response = await fetch ("http://172.24.135.24:8080/news", {method: "POST", body: data});
        console.log("Response(Non-JSON): ", response);
        const returnData = await response.json();
        console.log("Response(JSON): ", returnData);

        setStockData(returnData);
        setLoadedData(true);
    }

    useEffect(() => {
        fetchData();
    }, [props.Quote])

    // const scrollToElement = () => testref?.current?.scrollIntoView();
    return (
        <div>
            {loadedData ? 
                <div>
                    {stockData.StockNews.Titles.map((title: string, index: number) => {
                        return(
                            <article>
                                <div className={"NewsHeader"}>
                                    <LinkPreview url={stockData.StockNews.Sources[index]} width='400px' />
                                    <hr />
                                </div>
                            </article>
                        );
                    })}
                </div>
             : "Loading Data"}
        </div>
    );

}

export default News;