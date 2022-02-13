import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, Legend, Tooltip, ResponsiveContainer } from "recharts";

interface GraphData {
    Close: Array<number>,
    X: Array<number>
}

interface Graph {
    Data: GraphData
};

interface Props {
    Quote: string,
};

const PredictGraph = (props: Props) => {
    const [graphData, setGraphData] = useState<Graph | any>();
    const [loaded, setLoaded] = useState(false);

    const getData = async() => {

        const url = "http://172.24.135.24:8080/predict";
        const formdata = new FormData();
        formdata.append("quote", props.Quote);

        const resposne = await fetch(url, {method: "POST", body: formdata});
        console.log("Response future is: ", resposne);
        const respJSON = await resposne.json();
        console.log("RespJSON future: ", respJSON);

        setGraphData(respJSON.data);
        setLoaded(true);
    }

    useEffect(() => {
        getData();
    }, [props.Quote])

    return (
        <>
            {loaded ? 
                    <div style={{"paddingTop": "5%", "paddingLeft": "0"}}>
                        <h2>Future Stock Trend (90 days)</h2>
                        <ResponsiveContainer width="100%" height={750}>
                            <LineChart
                                data={graphData}
                                >
                                <Tooltip/>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="X" />
                                <Line dot={false} type="monotone" dataKey="Close" stroke="blue" activeDot={{ r: 3 }} />
                                <Legend />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>:
                "Loading data...."}
        </>
    );
}

export default PredictGraph;