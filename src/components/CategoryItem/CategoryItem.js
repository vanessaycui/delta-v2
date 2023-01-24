import { useState, useEffect } from "react";
import * as entriesAPI from "../../utilities/entries-api";

export default function CategoryItem({ dashId, category }) {
  const [rowInfo, setRowInfo] = useState({})

  useEffect(() => {
    async function getRowInfo() {
      let info = await entriesAPI.getRowCategory(dashId, category)
      setRowInfo(info)
    }
    getRowInfo()
  },[]);

  return (
    <tr>
      <td>{category.name}</td>
      <td>${rowInfo.prevMonth}</td>
      <td>{rowInfo.change}</td>
      <td>${rowInfo.currMonth}</td>
    </tr>
  );
}
