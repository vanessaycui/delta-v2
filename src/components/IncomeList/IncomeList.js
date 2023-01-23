import { useState, useEffect } from "react";

import * as dashboardsAPI from "../../utilities/dashboards-api";
import IncomeItem from "../IncomeItem/IncomeItem"

export default function IncomeList({incomes, dashId}) {

    const incomeList = incomes.map((income, idx)=><IncomeItem dashId={dashId} key={idx} income={income}/>)
  return (
    <tbody>
      {incomeList}
    </tbody>
  );
}
