import { useState, useEffect } from "react";
import * as entriesAPI from "../../utilities/entries-api";
import "./CategoryItem.css"

export default function CategoryItem({ currentDashboard, category}) {
  const [rowInfo, setRowInfo] = useState({})

  useEffect(() => {
    async function getRowInfo() {
      let info = await entriesAPI.getRowCategory(currentDashboard._id, category)
      setRowInfo(info)

    }
    getRowInfo()
    
  },[currentDashboard]);

  return (
    <tr className="cat-income-list">
      <td>{category.name}</td>
      <td>${rowInfo.prevMonth}</td>
      <td style={{color: rowInfo.change>0? "var(--orange)":"var(--black)"}}>{rowInfo.change}</td>
      <td>${rowInfo.currMonth}</td>
    </tr>
  );
}
