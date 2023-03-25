import React from "react";
import './homepage.scss';
import HeaderComponent from "../components/header.component";
import PaymentCard from "../cards/payment.card";

const HomePage = () => {
    return <div className="homepage">
        <HeaderComponent/>
        <PaymentCard/>
    </div>
}

export default HomePage;