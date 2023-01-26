import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import * as entriesAPI from "../../utilities/entries-api";
import BarChart from "../BarChart/BarChart";
import DoughnutChart from "../DoughnutChart/DoughnutChart";

import "./DashboardChart.css";

export default function DashboardChart({ currentDashboard }) {
  //get date info
  const date = new Date();
  const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const currentMonthDate = new Date(date.getFullYear(), date.getMonth(), 0);
  const prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 0);
  //state
  const [chartData, setChartData] = useState(null);
  const [circleChartData, setCircleChartData] = useState(null);
  const [circlePrevChartData, setCirclePrevChartData]=useState(null);
  const [entryInfo, setEntryInfo] = useState([]);
  const pieColours=["rgb(243, 197, 197)","rgb(193, 163, 163)","rgb(136, 111, 111)","rgb(105, 78, 78)"]

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
          backgroundColor: entryInfo.map((info,idx) => `rgb(${Math.floor(Math.random() * (255-180)+180)},${Math.floor(Math.random() * (196-135)+135)},${Math.floor(Math.random() * (180-135)+135)})`),
          hoverOffset: 4,
        },
      ],
    })
    setCirclePrevChartData({
      labels: entryInfo.map((info) => info.category),
      datasets: [
        {
          label: "Previous Month Spending",
          data: entryInfo.map((info) => info.prevMonth),
          backgroundColor: entryInfo.map((info,idx) => `rgb(${Math.floor(Math.random() * (180-135)+135)},${Math.floor(Math.random() * (196-135)+135)},${Math.floor(Math.random() * (255-180)+180)})`),
          hoverOffset: 4,
        },
      ],
    })
  }, [entryInfo]);

  return (
    <div className="DashboardChart">
      {chartData ? <BarChart chartData={chartData} /> : <></>}
      {circleChartData? <DoughnutChart data={circleChartData}/>: <></>} 
      {circlePrevChartData? <DoughnutChart data={circlePrevChartData}/>: <></>} 
    </div>
  );
}
