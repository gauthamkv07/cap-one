import React from "react";
import "./recent-transactions.scss";

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

    return <div className="recent-transc">
        <div className="recent-transc-header">
            <div className="recent-transc-header-text">Recent Transactions</div>
        </div>
        {datas.map((data) => (<div className="recent-transc-row">
            <div className="rt-data">
                <div className="rt-month">{data.month}</div>
                <div className="rt-day">{data.day}</div>
                <div className="rt-receiver">{data.receiver}</div>
            </div>
            <div className="rt-price">${data.price}</div>
        </div>))}
    </div>
}

export default RecentTransactions;