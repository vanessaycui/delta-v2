import { useState, useEffect } from "react";

import * as dashboardsAPI from "../../utilities/dashboards-api";
import CategoryList from "../CategoryList/CategoryList"
import IncomeList from "../IncomeList/IncomeList"

import "./DashboardTable.css";

export default function DashboardTable({ currentDashboard }) {
    //toggles cat and income form 
    const [catForm, setCatForm]=useState(false)
    const [incomeForm, setIncomeForm]=useState(false)

    function handleAddCatIncome(evt){
        if (evt.target.name==="category"){
            let formstatus=catForm
            setCatForm(!formstatus)


        } else if(evt.target.name==="income"){
            let formstatus=incomeForm
            setIncomeForm(!formstatus)

        }
    }



  return (
    <div className="DashboardTable">
        <div className="cat-income-form">
            {catForm? <p>catform</p>:<></>}
            {incomeForm? <p>incomeform</p>:<></>}


        </div>

      <table>
        <thead>
          <tr>
            <td>Categories <button name="category" onClick={handleAddCatIncome}>add</button></td>
            <td>Prev. Month Total</td>
            <td>Overall Monthly Avg.</td>
            <td>% Change</td>
            <td>Current Month</td>
          </tr>
        </thead>
        {currentDashboard.categories ? <CategoryList categories={currentDashboard.categories} dashId={currentDashboard.id} />:<></> }
        <tbody>
        <tr>
            <td>Incomes <button name="income" onClick={handleAddCatIncome}>add</button></td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
          </tbody>
        {currentDashboard.incomes ? <IncomeList incomes={currentDashboard.incomes} dashId={currentDashboard.id}/>:<></>}
      </table>
      <div className="cat-income-form">

      </div>
    </div>
  );
}
