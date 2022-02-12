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

        const url = "http://10.1.242.162:8080/info";

        const resposne = await fetch(url, {method: "POST", body: data});
        console.log("Response: ", resposne);
        const infoResp = await resposne.json();
        console.log("Response data: ", infoResp);

        setInfoData(infoResp.StockInfo);
        setLoadedData(true);

    }

    useEffect(() => {
        fetchInfo();
    }, [])

    return (
        <>
            {loadedData ? 
                <div>
                    <div className={"NewsHeader"}>
                        Long Name: {infoData?.LongName}
                        <hr />
                        Website: <a href={infoData?.Website}>{infoData?.Website}</a>
                        <hr />
                        Sector: {infoData?.Sector}
                        <hr />
                        Industry: {infoData?.Industry}
                        <hr />
                        Gross Margin: {infoData?.GrossMargin}
                        <hr />
                        Profit Margin: {infoData?.ProfitMargin}
                        <hr />
                        Return On Assets: {infoData?.ReturnOnAssets}
                        <hr />
                        Total Cash: {infoData?.TotalCash}
                        <hr />
                        Total Debt: {infoData?.TotalDebt}
                        <hr />
                        Total Revenue: {infoData?.TotalRevenue}
                        <hr />
                    </div>                    
                </div>
             : "Loading Data"}
        </>
    );
}

export default Info;