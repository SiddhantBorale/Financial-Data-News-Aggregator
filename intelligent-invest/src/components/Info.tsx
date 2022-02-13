import React from "react";
import { useEffect } from "react";
import { useState } from "react";

interface IProps {
    Quote: string
}

interface IInfo {
    Sector: string,
    Website: string,
    Industry: string,
    GrossMargin: string,
    ProfitMargin: string,
    ReturnOnAssets: string,
    TotalCash: string,
    TotalDebt: string,
    TotalRevenue: string,
    LongName: string,
}

const Info = (props: IProps) => {

    const [infoData, setInfoData] = useState<IInfo | undefined>(undefined);
    const [loadedData, setLoadedData] = useState(false);

    const fetchInfo = async() => {
        const data = new FormData();
        data.append("quote", props.Quote);

        const url = "http://172.24.135.24:8080/info";

        const resposne = await fetch(url, {method: "POST", body: data});
        console.log("Response: ", resposne);
        const infoResp = await resposne.json();
        console.log("Response data: ", infoResp);

        setInfoData(infoResp.StockInfo);
        setLoadedData(true);
    }

    useEffect(() => {
        fetchInfo();
    }, [props.Quote])

    return (
        <>
            {loadedData ? 
                <div>
                    <div className={"NewsHeader"}>
                        <pre>
                        <table className={"infoTable"}>
                        <tr>
                        <th className={"c1"}>Gross Margin: {infoData?.GrossMargin}</th>
                        <th className={"c2"}>                    Profit Margin: {infoData?.ProfitMargin}</th>
                        </tr>
                        <br />
                        <tr>
                        <th>Return On Assets: {infoData?.ReturnOnAssets}</th>    
                        <th>                    Total Revenue: {infoData?.TotalRevenue}</th>
                        </tr>
                        <br />
                        <tr>
                        <th>Total Cash: {infoData?.TotalCash}</th>   
                        <th>                    Total Debt: {infoData?.TotalDebt}</th>
                        </tr>
                        <hr /></table></pre>
                    </div>                  
                </div>
             : "Loading Data"}
        </>
    );
}

export default Info;