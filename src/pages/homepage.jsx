import React from "react";
import './homepage.scss';
import HeaderComponent from "../components/header-component/header.component";
import PaymentCard from "../components/payment-card/payment.card";
import CreditScoreCard from "../components/credit-score-card/credit-score-card";
import BarChartHistory from "../components/BarChartHistory/barcharthistory.component";
import FutureExpenseCard from "../components/future-expense-card/future-expense-card";

import CategoryTransactionCard from "../components/category-transaction-card/category-transaction-card";
import RecentTransactions from "../components/recent-transactions/recent-transactions";
const HomePage = () => {
    return <div className="homepage">
        <HeaderComponent />
        <div className="home-body">
            <div>
                <PaymentCard />
                <div className="home-first-row">
                    <CreditScoreCard />
                    <FutureExpenseCard />
                </div>
                <BarChartHistory />
            </div>
            <div className="">
                <RecentTransactions />
                <CategoryTransactionCard />
            </div>
        </div>
    </div>
}

export default HomePage;