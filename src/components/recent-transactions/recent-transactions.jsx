import React, { useEffect, useState } from "react";
import CaptialOneAPIService from "../../services/capitalOne.services";
import "./recent-transactions.scss";

const captialOneAPIService = new CaptialOneAPIService();
const RecentTransactions = () => {
    const datas = [
        {
            month: "Mar",
            day: "24",
            receiver: "Halal Guys",
            price: "3.12"
        },
        {
            month: "Mar",
            day: "23",
            receiver: "Chipotle",
            price: "8.85"
        }
    ]

    const [_data, setData] = useState(datas);
    useEffect(() => {
        const fetchData = async () => {
            const response = await captialOneAPIService.getRecentTransactions();
            setData(response);
        };
        fetchData();
    }, []);

    return <div className="recent-transc">
        <div className="recent-transc-header">
            <div className="recent-transc-header-text">Recent Transactions</div>
        </div>
        {_data.map((data,index) => (
        <div className="recent-transc-row" key={index}>
            <div className="rt-data">
                <div className="rt-month">{data["month"]}</div>
                <div className="rt-day">{data["day"]}</div>
                <div className="rt-receiver">{data["receiver"]}</div>
            </div>
            <div className="rt-price">${data["price"]}</div>
        </div>
        ))}
    </div>
}

export default RecentTransactions;