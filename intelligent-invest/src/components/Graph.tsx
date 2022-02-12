import React, { useEffect } from "react";
import { useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface GraphData {
    Close: Array<number>,
    X: Array<number>
}

interface Graph {
    Data: GraphData
};

interface Props {
    Quote: string,
    Time: string
};

const Graph = (props: Props) => {
    const [graphData, setGraphData] = useState<Graph | any>();
    const [loaded, setLoaded] = useState(false);
    const [close, setClose] = useState<number[]>();
    const [x, setX] = useState<number[]>();

    const getData = async() => {

        const url = "http://10.1.242.162:8080/graph";
        const formdata = new FormData();
        formdata.append("quote", props.Quote);
        formdata.append("time", props.Time);

        const resposne = await fetch(url, {method: "POST", body: formdata});
        console.log("Response is: ", resposne);
        const respJSON = await resposne.json();
        console.log("RespJSON: ", respJSON);

        setGraphData(respJSON);
        setClose(respJSON.Close);
        setX(respJSON.X);
        setLoaded(true);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <h2>{props.Quote} Graph {props.Time}</h2>
            <br />
            {loaded ? 
                    <div>
                        <LineChart
                            width={1200}
                            height={500}
                            data={graphData.Data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            >
                            <Tooltip />
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="X" />
                            <Line type="monotone" dataKey="Close" stroke="green" activeDot={{ r: 5 }} />
                            <Legend />
                        </LineChart>  
                    </div>:
                "Loading data...."}
        </>
    );

}

export default Graph;