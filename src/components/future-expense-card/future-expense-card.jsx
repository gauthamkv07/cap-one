import React from "react";
import "./future-expense-card.scss";

const FutureExpenseCard = () => {
    return <div className="future-expense-card">
        <div className="future-score-card-title">Upcoming transactions</div>
        <div className="flow">Inflow:  <div className="in-flow">$8765</div></div>
        <div className="flow">Outflow:<div className="out-flow">$1765</div></div>
        <div className="flow">Status:<div className="in-flow">good</div></div>
    </div>
}

export default FutureExpenseCard;