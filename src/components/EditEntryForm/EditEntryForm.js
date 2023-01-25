import { useEffect, useState } from "react";
import * as entriesAPI from "../../utilities/entries-api";


export default function EditEntryForm({
}) {
  //can draw category info later
  const today = new Date();


  const [editCategoryEntry, setEditCategoryEntry] = useState({
    category:"",
    company: "",
    date: today.toISOString().slice(0, 10),
    cost: 0,
    comment: "",
  });

  const [editIncomeEntry, setEditIncomeEntry] = useState({
    incomeType:"",
    company: "",
    date: today.toISOString().slice(0, 10),
    income: 0,
    comment: "",
  });
  const [error, setError] = useState("");

  //generate select options if there are categories or incomes

  
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
  

  //handle changes to input
  function handleCatChange(evt) {
    setNewCategoryEntry({
      ...newCategoryEntry,
      [evt.target.name]: evt.target.value,
    });
  }

  function handleIncomeChange(evt) {
    setIncomeEntry({ ...newIncomeEntry, [evt.target.name]: evt.target.value });
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
  }

  function handleCancel(evt) {
    evt.preventDefault();
    setShowEntryForm(false);
  }

  return (
    <div>
      {showEntryForm ? (
        <div className="EntryForm">
          {formType === "categoryEntry" ? (
            <form
              name="category"
              autoComplete="off"
              onSubmit={handleEntrySubmit}
            >
              <h1>New Entry</h1>
              <label>Category</label>
              <select
                name="category"
                value={newCategoryEntry.category}
                onChange={handleCatChange}
                required
              >
                {categoriesList? categoriesList: <></>}
              </select>
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={newCategoryEntry.company}
                onChange={handleCatChange}
                pattern="[a-zA-Z0-9 ]{1,20}"
              ></input>
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={newCategoryEntry.date}
                required
                max={today.toISOString().slice(0, 10)}
                onChange={handleCatChange}
              ></input>
              <label>Amount</label>
              <input
                type="number"
                name="cost"
                value={newCategoryEntry.amount}
                required
                min="0"
                step=".01"
                onChange={handleCatChange}
              ></input>
              <label>Comment</label>
              <input
                type="text"
                name="comment"
                value={newCategoryEntry.comment}
                onChange={handleCatChange}
              ></input>

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
              <h1>Add Income</h1>
              <label>Income Type</label>
              <select
                name="incomeType"
                value={newIncomeEntry.incomeType}
                onChange={handleIncomeChange}
                required
              >
                {incomesList? incomesList: <></>}
              </select>
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={newIncomeEntry.company}
                onChange={handleIncomeChange}
                pattern="[a-zA-Z0-9 ]{1,20}"
              ></input>
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={newIncomeEntry.date}
                required
                max={today.toISOString().slice(0, 10)}
                onChange={handleIncomeChange}
              ></input>
              <label>Amount</label>
              <input
                type="number"
                name="income"
                value={newIncomeEntry.amount}
                required
                min="0"
                step=".01"
                onChange={handleIncomeChange}
              ></input>
              <label>Comment</label>
              <input
                type="text"
                name="comment"
                value={newIncomeEntry.comment}
                onChange={handleIncomeChange}
              ></input>

              <button className="btn" type="submit">
                Done
              </button>
              <button className="btn" onClick={handleCancel}>
                cancel
              </button>
              <p className="error-message">&nbsp;{error}</p>
            </form>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}