import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import * as entriesAPI from "../../utilities/entries-api";
import BarChart from "../BarChart/BarChart";
import DoughnutChart from "../DoughnutChart/DoughnutChart";

import "./DashboardChart.css";

export default function DashboardChart({ currentDashboard, showPieChart }) {
  //get date info
  const date = new Date();
  const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const currentMonthDate = new Date(date.getFullYear(), date.getMonth(), 0);
  const prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 0);
  //state
  const [chartData, setChartData] = useState(null);
  const [circleChartData, setCircleChartData] = useState(null);
  const [circlePrevChartData, setCirclePrevChartData] = useState(null);
  const [entryInfo, setEntryInfo] = useState([]);
  const pieColours = [
    "rgb(255, 135, 135)",
    "rgb(248, 196, 180)",
    "rgb(229, 235, 178)",
    "rgb(188, 226, 158)",
    "rgb(247, 164, 164)",
    "rgb(254, 190, 140)",
    "rgb(255, 251, 193)",
    "rgb(182, 226, 161)",
    "rgb(134, 200, 188)",
  ];
  const otherPieColours = [
    "rgb(223, 14, 98)",
    "rgb(250, 199, 11)",
    "rgb(18, 118, 129)",
    "rgb(255, 89, 89)",
    "rgb(255, 173, 90)",
    "rgb(79, 157, 166)",
  ];

  useEffect(() => {
    // to be refactored ------
    async function getallEntries() {
      let chartData = [];
      const allEntries = await entriesAPI.getEntries(currentDashboard._id);

      currentDashboard.categories.forEach((category) => {
        let prevMonthEntries = allEntries.filter(
          (entry) =>
            entry.category == category.name &&
            new Date(entry.date) >= prevMonthDate &&
            new Date(entry.date) < currentMonthDate
        );
        let currMonthEntries = allEntries.filter(
          (entry) =>
            entry.category == category.name &&
            new Date(entry.date) >= currentMonthDate &&
            new Date(entry.date) < nextMonthDate
        );
        console.log(currMonthEntries);
        let prevMonthSum = prevMonthEntries.reduce(function (total, entry) {
          return total + entry.cost;
        }, 0);
        let currMonthSum = currMonthEntries.reduce(function (total, entry) {
          return total + entry.cost;
        }, 0);

        chartData.push({
          category: category.name,
          prevMonth: prevMonthSum,
          currMonth: currMonthSum,
        });
      });
      setEntryInfo(chartData);
    }
    getallEntries();

    //to be refactored ----
  }, [currentDashboard]);

  useEffect(() => {
    setChartData({
      labels: entryInfo.map((info) => info.category),
      datasets: [
        {
          label: "previous month spending ($)",
          data: entryInfo.map((info) => info.prevMonth),
          borderWidth: 1,
          backgroundColor: "rgba(73, 113, 116, 0.95)",
        },
        {
          label: "current month spending($)",
          data: entryInfo.map((info) => info.currMonth),
          borderWidth: 1,
          backgroundColor: "rgba(235, 100, 64, 0.95)",
        },
      ],
    });

    setCircleChartData({
      labels: entryInfo.map((info) => info.category),
      datasets: [
        {
          label: "Current Month Spending",
          data: entryInfo.map((info) => info.currMonth),
          backgroundColor: entryInfo.map((info, idx) => pieColours[idx]),
          hoverOffset: 4,
        },
      ],
    });
    setCirclePrevChartData({
      labels: entryInfo.map((info) => info.category),
      datasets: [
        {
          label: "Previous Month Spending",
          data: entryInfo.map((info) => info.prevMonth),
          backgroundColor: entryInfo.map((info, idx) => pieColours[idx]),
          hoverOffset: 4,
        },
      ],
    });
  }, [entryInfo]);

  return (
    <div className="DashboardChart">
      {showPieChart ? (
        <>
          {circlePrevChartData ? (
            <div className="pie-chart-box">
            
            <DoughnutChart data={circlePrevChartData} />
            <p>Previous Month Spending</p>
            </div>
          ) : (
            <></>
          )}
          {circleChartData ? 
          <div className="pie-chart-box">
          
          <DoughnutChart data={circleChartData} />
          <p>Current Month Spending</p>
           </div>: <></>}
        </>
      ) : (
        <>{chartData ? <BarChart chartData={chartData} /> : <></>}</>
      )}
    </div>
  );
}
