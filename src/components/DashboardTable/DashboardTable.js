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
}) {
  //set form type for entry and toggle entry form
  const [formType, setFormType] = useState();
  

  //toggles category and income form
  const [catForm, setCatForm] = useState(false);
  const [incomeForm, setIncomeForm] = useState(false);
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
  }

  //toggles cat and income form
  function handleAddCatIncome(evt) {
    if (evt.target.name === "category") {
      let formstatus = catForm;
      setCatForm(!formstatus);
    } else if (evt.target.name === "income") {
      let formstatus = incomeForm;
      setIncomeForm(!formstatus);
    }
  }

  function changeEntryType(evt) {
    setFormType(evt.target.name);
    setShowEntryForm(true);
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
              <label>New Category:</label>
              <input
                name="category-input"
                value={catInput.category}
                onChange={handleChange}
              ></input>
              <button type="submit">add</button>
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
              <label>New Income:</label>
              <input
                name="income-input"
                value={incomeInput.income}
                onChange={handleChange}
              ></input>
              <button type="submit">add</button>
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
        <thead>
          <tr>
            <td>
              Categories{" "}
              <button name="category" onClick={handleAddCatIncome}>
                add
              </button>
            </td>
            <td>Prev. Month Total</td>
            <td>% Change</td>
            <td>Current Month</td>
          </tr>
        </thead>
        {currentDashboard.categories ? (
          <CategoryList currentDashboard={currentDashboard} />
        ) : (
          <></>
        )}
        <tbody>
          <tr>
            <td>
              Incomes{" "}
              <button name="income" onClick={handleAddCatIncome}>
                add
              </button>
            </td>
            <td> -- </td>
            <td> -- </td>
            <td> -- </td>
          </tr>
        </tbody>
        {currentDashboard.incomes ? (
          <IncomeList currentDashboard={currentDashboard} />
        ) : (
          <></>
        )}
        <TableFooter summaryData={summaryData} />
      </table>
      <div>
        {currentDashboard.categories ? (
          currentDashboard.categories.length > 0 ? (
            <button name="categoryEntry" onClick={changeEntryType}>
              Add Cost
            </button>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        {currentDashboard.incomes ? (
          currentDashboard.incomes.length > 0 ? (
            <button name="incomeEntry" onClick={changeEntryType}>
              Add Income
            </button>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
      <div className="table-forms">
        {Object.keys(currentDashboard).length === 0 ? (
          <></>
        ) : ( setShowEntryForm?
          <EntryForm
            currentDashboard={currentDashboard}
            setCurrentDashboard={setCurrentDashboard}
            formType={formType}
            showEntryForm={showEntryForm}
            setShowEntryForm={setShowEntryForm}
          />:
          <></>
        )}
      </div>
    </div>
  );
}
