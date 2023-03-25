import React from "react";
import './homepage.scss';
import HeaderComponent from "../components/header-component/header.component";
import PaymentCard from "../components/payment-card/payment.card";

const HomePage = () => {
    return <div className="homepage">
        <HeaderComponent/>
        <PaymentCard/>
    </div>
}

export default HomePage;