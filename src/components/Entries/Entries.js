import { useState } from "react";
import * as dashboardsAPI from "../../utilities/dashboards-api";

import "./Entries.css";

export default function Entries({ currentDashboard, setCurrentDashboard }) {
    const [entryType, setEntryType] = useState("income")

    let sources=[]
    if (entryType === "income"){
        let incomes = currentDashboard.incomes.map((income,idx)=> <div className="list-item" key={idx} value={income.incomeType}>{income.incomeType}</div>)
        sources = [...incomes]


    } else if (entryType==="category"){
        let categories = currentDashboard.categories.map((category,idx)=> <div className="list-item" key={idx} value={category.name}>{category.name}</div>)
        sources = [...categories]
    }

    function handleClick(evt){
        setEntryType(evt.target.name)
    }



 
    return (
    <>
    <h1> Entries for {currentDashboard.title} </h1>
      <div className="Entries">
        
        <div>
            <div className="entry-header">
                <button name="income" onClick={handleClick}>Income</button>
                <button name="category" onClick={handleClick}>Category</button>
            </div>
            <div className="income-cat-list">
                {sources}
            </div>
        </div>
        <div >
            <div  className="entry-header">
                <h2>entries</h2>
            </div>
            <div className="entry-section">

            </div>
        </div>
        <div className="form-section">
            <div className="entry-header">
                form section
            </div>
            <div>forms</div>
      

        </div>
        
      </div>
    </>
  );
}
