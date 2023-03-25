import React from "react";
import "./payment.card.scss";

const PaymentCard = () => {
    return <div className="payment-card">
        <div className="card-title">
            <div className="card-type">P L A T I N U M</div>
            <div className="card-number"> ...1234</div>
        </div>
        <div className="cur-balance-price">
            <div className="superscript">$</div>
            <div className="big-num">25</div>
            <div className="superscript">53</div>
        </div>
        <div className="cur-balance">
            CURRENT BALANCE
        </div>
        <div className="white-line"></div>
        <div className="cur-balance-price">
            <div className="superscript">$</div>
            <div className="big-num">120</div>
            <div className="superscript">47</div>
        </div>
        <div className="cur-balance">
            AVAILABLE CREDIT
        </div>
    </div>
}

export default PaymentCard;