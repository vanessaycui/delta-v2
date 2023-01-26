import { useState, useEffect } from "react";

import * as categoriesAPI from "../../utilities/categories-api";
import * as incomesAPI from "../../utilities/incomes-api";
import * as entriesAPI from "../../utilities/entries-api";

import EntryForm from "../EntryForm/EntryForm";
import CategoryList from "../CategoryList/CategoryList";
import IncomeList from "../IncomeList/IncomeList";
import TableFooter from "../TableFooter/TableFooter";
import "./DashboardTable.css";

export default function DashboardTable({
  currentDashboard,
  setCurrentDashboard,
  showEntryForm,
  setShowEntryForm,
  formType,
  catForm,
  setCatForm,
  incomeForm,
  setIncomeForm
}) {
  
  //toggles category and income form
  const [error, setError] = useState("");

  //data for new category/new income
  const [catInput, setCatInput] = useState({
    name: "", //match schema
  });
  const [incomeInput, setIncomeInput] = useState({
    incomeType: "", //match schema
  });
  const [summaryData, setSummaryData] = useState({});

  useEffect(() => {
    async function getSummaryData() {
      if (currentDashboard) {
        let summaryTotals = await entriesAPI.getSummary(currentDashboard._id);
        setSummaryData(summaryTotals);
      }
    }
    getSummaryData();
  }, [currentDashboard]);

  //handles form and submit for new income and category
  function handleChange(evt) {
    if (evt.target.name === "category-input") {
      setCatInput({ name: evt.target.value });
    } else if (evt.target.name === "income-input") {
      setIncomeInput({ incomeType: evt.target.value });
    }
  }
  async function handleSubmit(evt) {
    evt.preventDefault();
    if (evt.target.name === "new-cat-form") {
      try {
        const dashboard = await categoriesAPI.createCategory(
          currentDashboard._id,
          catInput
        );
        setCurrentDashboard(dashboard); //new set of categories to be rendered.
      } catch {
        setError("Create New Category Failed - Try Again");
      }
    } else if (evt.target.name === "new-income-form") {
      try {
        const dashboard = await incomesAPI.createIncome(
          currentDashboard._id,
          incomeInput
        );
        setCurrentDashboard(dashboard); //new set of incomes to be rendered
      } catch {
        setError("Create New Category Failed - Try Again");
      }
    }
    setCatForm(false)
    setIncomeForm(false)
  }

  //toggles cat and income form
  function handleAddCatIncome(evt) {
    if (evt.target.name === "category") {
      let formstatus = !catForm;
      setCatForm(formstatus);
      setIncomeForm(!formstatus);
    } else if (evt.target.name === "income") {
      let formstatus = !incomeForm;
      setIncomeForm(formstatus);
      setCatForm(!formstatus);
    }
  }


  function handleCancel(evt) {
    evt.preventDefault();
    if (evt.target.name === "cat-cancel") {
      setCatForm(false);
    } else if (evt.target.name === "income-cancel") {
      setIncomeForm(false);
    }
  }

  return (
    <div className="DashboardTable">
      <div className="table-forms">
        {catForm ? (
          <>
            <form
              name="new-cat-form"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <h4>ADD NEW CATEGORY TYPE:</h4>
              <label>New Category:</label>
              <br/>
              <input
              className="input-space"
                name="category-input"
                value={catInput.category}
                onChange={handleChange}
              ></input>
              <br/>
              <button className="btn" type="submit">+</button>
              <button name="cat-cancel" className="btn" onClick={handleCancel}>
                x
              </button>
            </form>
            <p>{error}</p>
          </>
        ) : (
          <></>
        )}
        {incomeForm ? (
          <>
            <form
              name="new-income-form"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <h4>ADD NEW INCOME TYPE:</h4>
              <label>New Income Type:</label>
              <br/>
              <input
              className="input-space"
                name="income-input"
                value={incomeInput.income}
                onChange={handleChange}
              />
              <br/>
              <button className="btn" type="submit">+</button>
              <button
                name="income-cancel"
                className="btn"
                onClick={handleCancel}
              >
                x
              </button>
            </form>
            <p>{error}</p>
          </>
        ) : (
          <></>
        )}
      </div>
      <table>
        <thead className="table-heading">
          <tr>
            <td>
              Categories{" "}
              <button className="btn" name="category" onClick={handleAddCatIncome}>
                +
              </button>
            </td>
            <td>Prev. Month Total</td>
            <td>% Change</td>
            <td>Current Month</td>
          </tr>
        </thead>
        <tbody>
        {currentDashboard.categories ? (
          <CategoryList currentDashboard={currentDashboard}/>
        ) : (
          <></>
        )}
          <tr className="table-division">
            <td>
              Incomes{" "}
              <button className="btn" name="income" onClick={handleAddCatIncome}>
                +
              </button>
            </td>
            <td> ----- </td>
            <td> ----- </td>
            <td> ----- </td>
          </tr>
        
        {currentDashboard.incomes ? (
          <IncomeList currentDashboard={currentDashboard} />
        ) : (
          <></>
        )}
        </tbody>
        <TableFooter summaryData={summaryData} />
      </table>
      {Object.keys(currentDashboard).length === 0 ? (
          <></>
        ) : ( setShowEntryForm?
      
      <div>
          <EntryForm
            currentDashboard={currentDashboard}
            setCurrentDashboard={setCurrentDashboard}
            formType={formType}
            showEntryForm={showEntryForm}
            setShowEntryForm={setShowEntryForm}
          />
      </div>
      :
      <></>
    
      )}
    </div>
  );
}
