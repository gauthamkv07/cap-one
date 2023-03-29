import React, { useCallback, useEffect, useState } from "react";
import "./category-transaction-card.scss";
import { PieChart, Pie, Sector, Cell } from 'recharts';
import CaptialOneAPIService from "../../services/capitalOne.services";


const captialOneAPIService = new CaptialOneAPIService();

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.category}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={3} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >{`${value}$`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};


const CategoryTransactionCard = () => {
    const data = [
        { category: "Food", totalSpendings: 400 },
        { category: "Groceries", totalSpendings: 300 },
        { category: "Entertainment", totalSpendings: 300 },
        { category: "Education", totalSpendings: 1000 },
        { category: "Others", totalSpendings: 200 }
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const [rtData, setRtData] = useState(data);
    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    useEffect(() => {
        const fetchData = async () => {
            const response = await captialOneAPIService.getSpendingsByCategory('/accounts/641f5f1978f6910a15f0e098/purchases');
            setRtData(response);
        };
        fetchData();
    }, []);

    var today = new Date();
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#ff5050', '#a3a0a0', '#974ffc'];
    return (
        <div className="categ-chart-card">
            <div className="categ-chart-title-color">
                <div className="categ-chart-card-title">{today.getFullYear()} </div>
                <div className="categ-chart-card-sub-title">Categorized Transactions</div>
            </div>
            <div>
            <PieChart width={600} height={600}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={!rtData ? data : rtData}
                    cx={280}
                    cy={210}
                    innerRadius={100}
                    outerRadius={130}
                    fill="#8884d8"
                    dataKey="totalSpendings"
                    onMouseEnter={onPieEnter}
                >
                {rtData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
            </PieChart>
            </div>
            <div>
                <p>Recent Transactions for Food</p>
            </div>
            
            {/* <div className="categ-chart-text">
                Here is the last four months cash flow data
            </div> */}
        </div>)
}

export default CategoryTransactionCard;