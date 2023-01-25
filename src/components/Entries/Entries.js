import { useState } from "react";
import * as dashboardsAPI from "../../utilities/dashboards-api";

import "./Entries.css";

export default function Entries({ currentDashboard, setCurrentDashboard }) {

    

    let categories = currentDashboard.categories.map((category,idx)=> <div className="list-item" key={idx} value={category.name}>{category.name}</div>)
    let sources = [...categories]
    return (
    <>
    <h1> Entries for {currentDashboard.title} </h1>
      <div className="Entries">
        
        <div>
            <div className="entry-header">
                <button>Income</button>
                <button>Category</button>
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
