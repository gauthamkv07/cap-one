import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "./barcharthistory.component.scss";
const BarChartHistory = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch credit and debit data from API or local data source
        const fetchData = async () => {
            //   const response = await fetch('/api/credit-debit-data');
            const json = [
                {
                    month: 'feb',
                    credit: 4000,
                    debit: 2400
                },
                {
                    month: 'mar',
                    credit: 2500,
                    debit: 1500
                },
                {
                    month: 'apr',
                    credit: 3000,
                    debit: 500
                },
                {
                    month: 'may',
                    credit: 3800,
                    debit: 123
                }]
            //   const json = await response.json();
            console.log("json data is", json)
            setData(json);
        };
        fetchData();
    }, []);

    var today = new Date();
    var month = today.toLocaleString('default', { month: 'long' });
    console.log(month);

    return (
        <div className="credit-score-card">
        <div className="credit-score-card-title">{month.substring(0,3)+' '+today.getFullYear()} Cash Flow Summary</div>
        <div className="credit-alignment">
            <div className="progress-bar-container">
            <BarChart width={300} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="credit" fill="#82ca9d" />
                <Bar dataKey="debit" fill="#f28b82" />
            </BarChart>
        </div><div className="credit-score-text">
        Here is the last four months cash flow data
            </div>
        </div>
        
        </div>
    );
};

export default BarChartHistory;