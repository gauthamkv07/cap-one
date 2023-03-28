import React, { useState, useEffect } from "react";
import CaptialOneAPIService from "../../services/capitalOne.services";
import "./future-expense-card.scss";

const cap = new CaptialOneAPIService();
const FutureExpenseCard = () => {
    const [data, setData] = useState(5384);
    // const [outFlow, setOutFlow] = useState(0);

    useEffect(() => {
                const fetchData = async () => {
                    const response = await cap.getTotalOutFlow();
                    setData(response);
                };
                fetchData();
            }
        , [data]);
    return <div className="future-expense-card">
        <div className="future-score-card-title">Upcoming transactions</div>
        <div className="flow">Inflow:  <div className="in-flow">$8765</div></div>
        <div className="flow">Outflow:<div className="out-flow">${data}</div></div>
        <div className="flow">Status:<div className="in-flow">good</div></div>
    </div>
}

export default FutureExpenseCard;