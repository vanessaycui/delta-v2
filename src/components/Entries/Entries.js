import { useEffect, useState } from "react";

import * as dashboardsAPI from "../../utilities/dashboards-api"
import * as incomesAPI from "../../utilities/incomes-api"
import * as categoriesAPI from "../../utilities/categories-api"
import * as entriesAPI from "../../utilities/entries-api";
import EntryItem from "../EntryItem/EntryItem";
import EntryGroup from "../EntryGroup/EntryGroup";

import "./Entries.css";

export default function Entries({ currentDashboard, setCurrentDashboard }) {
  const [entryType, setEntryType] = useState("income"); //income or category
  const [entryGroup, setEntryGroup] = useState(""); // a selected group of entries under income or category
  const [entryList, setEntryList] = useState([]); //full entry list under selected group, retrieved from BE
  const [selectedEntry, setSelectedEntry] = useState(null); //selected entry

  let entryGroups = []; //gets populated based on whether income or category button has been clicked
  if (entryType === "income") {
    let incomes = currentDashboard.incomes.map((income, idx) => (
      <EntryGroup
        handleEntryGroupSelection={handleEntryGroupSelection}
        handleEntryGroupDelete={handleEntryGroupDelete}
        entryType={entryType}
        key={idx}
        entryData={income}
      />
    ));
    entryGroups = [...incomes];
  } else if (entryType === "category") {
    let categories = currentDashboard.categories.map((category, idx) => (
      <EntryGroup
        handleEntryGroupSelection={handleEntryGroupSelection}
        handleEntryGroupDelete={handleEntryGroupDelete}
        entryType={entryType}
        key={idx}
        entryData={category}
      />
    ));
    entryGroups = [...categories];
  }

  function handleClick(evt) {
    //switches income and category type
    setEntryType(evt.target.name);
  }

  async function handleEntryGroupSelection(evt) {
    //when a group is selected, retrieve assoc. entries from BE
    setEntryGroup(evt.target.textContent);
    let filteredEntries = await entriesAPI.getFilteredEntries(
      currentDashboard._id,
      { [entryType]: evt.target.textContent }
    );
    setEntryList(filteredEntries);
  }

  async function handleEntryGroupDelete(groupId) {
    if (entryType === "income"){
        await incomesAPI.deleteIncome(currentDashboard._id, groupId)
    } else if (entryType ==="category"){
        await categoriesAPI.deleteCategory(currentDashboard._id, groupId)
    }
    let currentDash = await dashboardsAPI.getDashboard(currentDashboard._id)
    setCurrentDashboard(currentDash)
  }

  async function handleDeletedEntry(entryId) {
    //triggered by deleting an entry item
    console.log("entry deleted");
    await entriesAPI.deleteEntry(currentDashboard._id, entryId);
    //refresh list of entries
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
          <div className="income-cat-list">{entryGroups}</div>
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
