import { useState, useEffect } from "react";
import * as entriesAPI from "../../utilities/entries-api";

export default function IncomeItem({currentDashboard, income}) {
  const [rowInfo, setRowInfo] = useState({})

  useEffect(() => {
    async function getRowInfo() {
      let info = await entriesAPI.getRowIncome(currentDashboard._id, income)
      setRowInfo(info)
    }
    getRowInfo()
  },[currentDashboard]);
    

  return (
    <tr>
      <td>{income.incomeType}</td>
      <td>${rowInfo.prevMonth}</td>
      <td>{rowInfo.change}</td>
      <td>${rowInfo.currMonth}</td>
    </tr>
  );
}
