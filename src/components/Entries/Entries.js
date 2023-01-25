import { useEffect, useState } from "react";

import * as entriesAPI from "../../utilities/entries-api";
import EntryItem from "../EntryItem/EntryItem";

import "./Entries.css";

export default function Entries({ currentDashboard, setCurrentDashboard }) {
  const [entryType, setEntryType] = useState("income"); //income or category
  const [entryGroup, setEntryGroup] = useState(""); // a selected group of entries under income or category
  const [entryList, setEntryList] = useState([]); //full entry list under selected group, retrieved from BE
  const [selectedEntry, setSelectedEntry] = useState(null); //selected entry


  let sources = []; //gets populated based on whether income or category button has been clicked
  if (entryType === "income") {
    let incomes = currentDashboard.incomes.map((income, idx) => (
      <div className="list-item">
        <div key={idx} name={income.incomeType} onClick={handleEntrySelection}>
          {income.incomeType}
        </div>
        <div>
          <button>edit</button>
          <button>delete</button>
        </div>
      </div>
    ));
    sources = [...incomes];
  } else if (entryType === "category") {
    let categories = currentDashboard.categories.map((category, idx) => (
      <div className="list-item">
        <div key={idx} name={category.name} onClick={handleEntrySelection}>
          {category.name}
        </div>
        <div>
          <button>edit</button>
          <button>delete</button>
        </div>
      </div>
    ));
    sources = [...categories];
  }

  function handleClick(evt) {
    //switches income and category type
    setEntryType(evt.target.name);
  }

  async function handleEntrySelection(evt) {
    setEntryGroup(evt.target.textContent);

    let filteredEntries = await entriesAPI.getFilteredEntries(
      currentDashboard._id,
      { [entryType]: evt.target.textContent }
    );
    setEntryList(filteredEntries);
  }

  async function handleDeletedEntry(entryId) { //triggered by entryItem
    console.log("entry deleted");
    await entriesAPI.deleteEntry(currentDashboard._id, entryId)

    let filteredEntries = await entriesAPI.getFilteredEntries(
        currentDashboard._id,
        { [entryType]: entryGroup }
      );
      setEntryList(filteredEntries);
  }

  let displayedEntries = [];

  if (entryList.length > 0) {
    displayedEntries = entryList.map((entry, idx) => (
      <EntryItem
        handleDeletedEntry={handleDeletedEntry}
        currentDashboard={currentDashboard}
        entryType={entryType}
        key={idx}
        entry={entry}
      />
    ));
  }

  return (
    <>
      <h1> Entries for {currentDashboard.title} </h1>
      <div className="Entries">
        <div>
          <div className="entry-header">
            <h1>{entryType}</h1>
            <div>
              <button className="btn" name="income" onClick={handleClick}>
                Income
              </button>
              <button className="btn" name="category" onClick={handleClick}>
                Category
              </button>
            </div>
          </div>
          <div className="income-cat-list">{sources}</div>
        </div>
        <div>
          <div className="entry-header">
            <h2>{entryGroup}</h2>
          </div>
          <div className="entry-section">
            {displayedEntries.length > 0 ? (
              displayedEntries
            ) : (
              <>
                <p>No Entries</p>
              </>
            )}
          </div>
        </div>
        <div className="form-section">
          <div className="entry-header">form section</div>
          <div>forms</div>
        </div>
      </div>
    </>
  );
}
