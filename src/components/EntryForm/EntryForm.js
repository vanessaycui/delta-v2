import { useEffect, useState } from "react";
import * as entriesAPI from "../../utilities/entries-api";

import "./EntryForm.css";

export default function EntryForm({
  currentDashboard,
  setCurrentDashboard,
  formType,
  setShowEntryForm,
  showEntryForm,
}) {
  //can draw category info later
  const today = new Date();

  const [newCategoryEntry, setNewCategoryEntry] = useState({
    category: "",
    company: "",
    date: today.toISOString().slice(0, 10),
    cost: 0,
    comment: "",
  });

  const [newIncomeEntry, setNewIncomeEntry] = useState({
    incomeType: "",
    company: "",
    date: today.toISOString().slice(0, 10),
    income: 0,
    comment: "",
  });

  const[pastEntries, setPastEntries]=useState([])

  const [error, setError] = useState("");

  //***********RETRIEVE PAST ENTRIES */
  useEffect(()=>{
    async function getFilteredEntries(){
      if (newCategoryEntry.category !==""){
        let catEntries = await entriesAPI.getFilteredEntries(currentDashboard._id, newCategoryEntry )
        catEntries.sort((a,b)=>{ //sort decending order
          const entryA= new Date(a.createdAt)
          const entryB = new Date(b.createdAt)
          return entryB- entryA
        })
        setPastEntries(catEntries.slice(0,5))
      }
    }
    getFilteredEntries()   
  }, [newCategoryEntry.category])

  useEffect(()=>{
    async function getFilteredEntries(){
      if (newIncomeEntry.incomeType !==""){
        let incomeEntries = await entriesAPI.getFilteredEntries(currentDashboard._id, newIncomeEntry )
        incomeEntries.sort((a,b)=>{ //sort decending order
          const entryA= new Date(a.createdAt)
          const entryB = new Date(b.createdAt)
          return entryB- entryA
        })
        setPastEntries(incomeEntries.slice(0,5))
      }
    }
    getFilteredEntries()   
  }, [newIncomeEntry.incomeType])

  let pastEntriesList;
  if (pastEntries){
    pastEntriesList=pastEntries.map(entry=><p>${entry.cost}{entry.income} @ {entry.company? entry.company : "unknown company"} on {entry.date.slice(0,10)} </p>)
  }





  let categoriesList = currentDashboard.categories.map((category, idx) => (
    <option key={idx} value={category.name}>
      {category.name}
    </option>
  ));

  let incomesList = currentDashboard.incomes.map((income, idx) => (
    <option key={idx} value={income.incomeType}>
      {income.incomeType}
    </option>
  ));

  function handleCatChange(evt) {
    setNewCategoryEntry({
      ...newCategoryEntry,
      [evt.target.name]: evt.target.value,
    });
  }

  function handleIncomeChange(evt) {
    setNewIncomeEntry({
      ...newIncomeEntry,
      [evt.target.name]: evt.target.value,
    });
  }

  async function handleEntrySubmit(evt) {
    evt.preventDefault();
    if (evt.target.name === "income") {
      try {
        const dashboard = await entriesAPI.createEntry(
          currentDashboard._id,
          newIncomeEntry
        );
        setCurrentDashboard(dashboard);
      } catch {
        setError("Create New Entry Failed - Try Again");
      }
    } else if (evt.target.name === "category") {
      try {
        const dashboard = await entriesAPI.createEntry(
          currentDashboard._id,
          newCategoryEntry
        );
        setCurrentDashboard(dashboard);
      } catch {
        setError("Create New Entry Failed - Try Again");
      }
    }
    setShowEntryForm(false);
    setPastEntries([])
    setNewCategoryEntry({
      category: "",
      company: "",
      date: today.toISOString().slice(0, 10),
      cost: 0,
      comment: "",
    })
    setNewIncomeEntry({
      incomeType: "",
      company: "",
      date: today.toISOString().slice(0, 10),
      income: 0,
      comment: "",
    })
  }

  function handleCancel(evt) {
    evt.preventDefault();
    setShowEntryForm(false);
    setNewCategoryEntry({
      category: "",
      company: "",
      date: today.toISOString().slice(0, 10),
      cost: 0,
      comment: "",
    })
    setNewIncomeEntry({
      incomeType: "",
      company: "",
      date: today.toISOString().slice(0, 10),
      income: 0,
      comment: "",
    })
    setPastEntries([])
  }

  return (
    <>
    
      {showEntryForm ? (
        
        <div className="EntryForm">
    
          {formType === "categoryEntry" ? (
            <form
              name="category"
              autoComplete="off"
              onSubmit={handleEntrySubmit}
            >
              <h4>ADD NEW CATEGORY ENTRY</h4>
              <label>Category</label>
              <select
                name="category"
                value={newCategoryEntry.category}
                onChange={handleCatChange}
                required
              >
                <option value="">----</option>
                {categoriesList ? categoriesList : <></>}
              </select>
              <br/>
              <label>Company</label>
              <input
              className="input-space"
                type="text"
                name="company"
                value={newCategoryEntry.company}
                onChange={handleCatChange}
                pattern="[a-zA-Z0-9 ]{1,20}"
              ></input>
              <br/>
              <label>Date</label>
              <input
              className="input-space"
                type="date"
                name="date"
                value={newCategoryEntry.date}
                required
                max={today.toISOString().slice(0, 10)}
                onChange={handleCatChange}
              ></input>
              <br/>
              <label>Amount</label>
              <input
              className="input-space"
                type="number"
                name="cost"
                value={newCategoryEntry.amount}
                required
                min="0"
                step=".01"
                onChange={handleCatChange}
              ></input>
              <br/>
              <label>Comment</label>
              <input
              className="input-space"
                type="text"
                name="comment"
                value={newCategoryEntry.comment}
                onChange={handleCatChange}
              ></input>
              <br/>

              <button className="btn" type="submit">
                Done
              </button>
              <button className="btn" onClick={handleCancel}>
                cancel
              </button>
              <p className="error-message">&nbsp;{error}</p>
            </form>
          ) : (
            <form name="income" autoComplete="off" onSubmit={handleEntrySubmit}>
              <h4>ADD NEW INCOME ENTRY</h4>
              <label>Income Type</label>
              <select
                name="incomeType"
                value={newIncomeEntry.incomeType}
                onChange={handleIncomeChange}
                required
              >
                <option value="">----</option>
                {incomesList ? incomesList : <></>}
              </select>
              <br/>
              <label>Company</label>
              <input
              className="input-space"
                type="text"
                name="company"
                value={newIncomeEntry.company}
                onChange={handleIncomeChange}
                pattern="[a-zA-Z0-9 ]{1,20}"
              ></input>
              <br/>
              <label>Date</label>
              <input
              className="input-space"
                type="date"
                name="date"
                value={newIncomeEntry.date}
                required
                max={today.toISOString().slice(0, 10)}
                onChange={handleIncomeChange}
              ></input>
              <br/>
              <label>Amount</label>
              <input
              className="input-space"
                type="number"
                name="income"
                value={newIncomeEntry.amount}
                required
                min="0"
                step=".01"
                onChange={handleIncomeChange}
              ></input>
              <br/>
              <label>Comment</label>
              <input
              className="input-space"
                type="text"
                name="comment"
                value={newIncomeEntry.comment}
                onChange={handleIncomeChange}
              ></input>
              <br/>


              <button className="btn" type="submit">
                Done
              </button>
              <button className="btn" onClick={handleCancel}>
                cancel
              </button>
              <p className="error-message">&nbsp;{error}</p>
            </form>
          )}
      

        <div className="past-entry-box">
          <h4>Past entries:</h4>
          {pastEntriesList? <>{pastEntriesList}</>:<>No Entries</>}
        </div>
        </div>


      ) : (
        <></>
      )}
      


    </>
  );
}
