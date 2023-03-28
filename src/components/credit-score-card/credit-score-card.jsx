import React from "react";
import "./credit-score-card.scss";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CreditScoreCard = () => {
    const score = 699;
    return <div className="credit-score-card">
        <div className="credit-score-card-title">Credit Score</div>
        <div className="credit-alignment">
            <div className="progress-bar-container">
                <CircularProgressbar
                    value={score/10} text={`${score}`}
                    circleRatio={0.7}
                    styles={{
                        trail: {
                            strokeLinecap: "butt",
                            transform: "rotate(-126deg)",
                            transformOrigin: "center center"
                        },
                        path: {
                            stroke: `rgba(${score <= 333 ? 255 : 0} , ${score > 333 && score <= 666 ? 255 : 0} , ${score > 666 ? 255 : 0}, ${100 / 100})`,
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