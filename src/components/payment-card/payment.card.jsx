import React, { useState, useEffect } from "react";
import CaptialOneAPIService from "../../services/capitalOne.services";
import "./payment.card.scss";

const capService = new CaptialOneAPIService();
const PaymentCard = () => {
    const [data, setState] = useState(0);

    useEffect(() =>{
        const fetchData = async ()=>{
            const res = await capService.getThisMonthAmt();
            setState(res);
        }
        fetchData();
    },[]);
    return <div className="payment-card">
        <div className="card-title">
            <div className="card-type">P L A T I N U M</div>
            <div className="card-number"> ...1234</div>
        </div>
        <div className="cur-balance-price">
            <div className="superscript">$</div>
            <div className="big-num">{(Number.isInteger(data))?data:(data-data%1)}</div>
            <div className="superscript">{(Number.isInteger(data))?'00':(data%1).toString().slice(0,4)}</div>
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