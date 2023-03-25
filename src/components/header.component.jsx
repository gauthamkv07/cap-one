import React from "react";
import "./header.component.scss";
import logo from "../asset/Capital-One-Logo.png";

const HeaderComponent = () => {
    return <div className="header">
        <img src={logo} className="logo" alt="logo" />
    </div>
}

export default HeaderComponent;