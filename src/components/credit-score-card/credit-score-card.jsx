import React from "react";
import "./credit-score-card.scss";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CreditScoreCard = () => {
    const score = 67;
    return <div className="credit-score-card">
        <div className="credit-score-card-title">Credit Score</div>
        <div className="credit-alignment">
            <div className="progress-bar-container">
                <CircularProgressbar
                    value={score} text={`${score}%`}
                    circleRatio={0.7}
                    styles={{
                        trail: {
                            strokeLinecap: "butt",
                            transform: "rotate(-126deg)",
                            transformOrigin: "center center"
                        },
                        path: {
                            stroke: `rgba(${score <= 33 ? 255 : 0} , ${score > 33 && score <= 66 ? 255 : 0} , ${score > 66 ? 255 : 0}, ${100 / 100})`,
                            transform: "rotate(-126deg)",
                            transformOrigin: "center center"
                        }
                    }}
                />
            </div>
        </div>
    </div>
}

export default CreditScoreCard;