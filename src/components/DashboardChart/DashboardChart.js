import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import * as entriesAPI from "../../utilities/entries-api"
import BarChart from "../BarChart/BarChart"

import "./DashboardChart.css";

export default function DashboardChart({ currentDashboard}) {
  const [chartData, setChartData] = useState(null);
  const [entryInfo, setEntryInfo]=useState([])

    //get date info
    const date = new Date();
    const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const currentMonthDate = new Date(date.getFullYear(), date.getMonth(), 0);
    const prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 0);


 
  useEffect(()=>{
    // to be refactored ------
    async function getallEntries() {
      let chartData = [];
      const allEntries = await entriesAPI.getEntries(currentDashboard._id);
      
      //loop thru each category in curr dashboard.
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
        console.log(currMonthEntries)
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

      setEntryInfo(chartData)
    }
    getallEntries();

    //to be refactored ----
    
},[currentDashboard])

useEffect(()=>{
  setChartData({ 
    labels: entryInfo.map(info=>info.category),
    datasets:[
      {
      label: "previous month spending ($)",
      data: entryInfo.map(info=>info.prevMonth),
      borderWidth: 1,
      backgroundColor: 'rgba(73, 113, 116, 0.95)'
    },
    {
      label: "current month spending($)",
      data: entryInfo.map(info=>info.currMonth),
      borderWidth: 1,
      backgroundColor: 'rgba(235, 100, 64, 0.95)'
    },
  ]
})



},[entryInfo])


 
  return (
    <div className="DashboardChart">
      {chartData? 
      <BarChart chartData={chartData}/>: <></>}
    </div>
  );
}
