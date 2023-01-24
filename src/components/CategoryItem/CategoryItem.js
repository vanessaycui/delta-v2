import { useState, useEffect } from "react";
import * as entriesAPI from "../../utilities/entries-api";

export default function CategoryItem({ dashId, category }) {
  //sort entry data by dash id and category. add all according to prev month, percent change, current month.
  //clikcing on category item will trigger form to open.
  const [rowInfo, setRowInfo] = useState({})

  useEffect(() => {
    async function getRowInfo() {
      let info = await entriesAPI.getRow(dashId, category)
      setRowInfo(info)
    }
    getRowInfo()
  },[]);

  
  return (
    <tr>
      <td>{category.name}</td>
      <td>?</td>
      <td>?</td>
      <td>?</td>
      <td>?</td>
    </tr>
  );
}
