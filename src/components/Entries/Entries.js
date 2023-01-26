import { useEffect, useState } from "react";

import * as dashboardsAPI from "../../utilities/dashboards-api";
import * as incomesAPI from "../../utilities/incomes-api";
import * as categoriesAPI from "../../utilities/categories-api";
import * as entriesAPI from "../../utilities/entries-api";

import EntryItem from "../EntryItem/EntryItem";
import EntryGroup from "../EntryGroup/EntryGroup";
import EditEntryForm from "../EditEntryForm/EditEntryForm";
import "./Entries.css";

export default function Entries({ currentDashboard, setCurrentDashboard }) {
  const [entryType, setEntryType] = useState("income"); //income or category
  const [entryGroup, setEntryGroup] = useState(""); // a selected group of entries under income or category
  const [entryList, setEntryList] = useState([]); //full entry list under selected group, retrieved from BE
  const [editItemData, setEditItemData] = useState({
    type: null,
    data: "",
  }); //identifies what item is selected for edit (income/category group or entry)
  const [entryGroupData, setEntryGroupData] = useState({});
  const [showEditForms, setShowEditForms] = useState(false);

  let entryGroups = []; //gets populated based on whether income or category button has been clicked
  if (entryType === "income") {
    let incomes = currentDashboard.incomes.map((income, idx) => (
      <EntryGroup
        handleEntryGroupSelection={handleEntryGroupSelection}
        handleEntryGroupDelete={handleEntryGroupDelete}
        handleEntryEdit={handleEntryEdit}
        entryType={entryType}
        key={idx}
        entryData={income}
        setEntryGroupData={setEntryGroupData}
      />
    ));
    entryGroups = [...incomes];
  } else if (entryType === "category") {
    let categories = currentDashboard.categories.map((category, idx) => (
      <EntryGroup
        handleEntryGroupSelection={handleEntryGroupSelection}
        handleEntryGroupDelete={handleEntryGroupDelete}
        handleEntryEdit={handleEntryEdit}
        entryType={entryType}
        key={idx}
        entryData={category}
        setEntryGroupData={setEntryGroupData}
      />
    ));
    entryGroups = [...categories];
  }

  function handleClick(evt) {
    //switches income and category type
    setEntryType(evt.target.name);
    setShowEditForms(false);
    setEntryList([])
    setEntryGroup("")
  }

  async function handleEntryGroupSelection(groupName) {
    //when a group is selected, retrieve assoc. entries from BE
    setEntryGroup(groupName);
    let filteredEntries = await entriesAPI.getFilteredEntries(
      currentDashboard._id,
      { [entryType]: groupName }
    );
    setEntryList(filteredEntries);
    setShowEditForms(false);
  }

  async function handleEntryGroupDelete(groupId) {
    if (entryType === "income") {
      await incomesAPI.deleteIncome(currentDashboard._id, groupId);
    } else if (entryType === "category") {
      await categoriesAPI.deleteCategory(currentDashboard._id, groupId);
    }
    let currentDash = await dashboardsAPI.getDashboard(currentDashboard._id);
    setCurrentDashboard(currentDash);
    setEntryList([]);
    setEntryGroup("");
  }

  //set-up state and data needed to generate proper form
  function handleEntryEdit(type, data) {
    setEditItemData({ type: type, data: data });
    setShowEditForms(true);
  }

  //handle updating UI after renaming income/category group, editing entry data
  async function handleEntryUpdate(type) {
    if (type === "income"){
      let currentDash = await dashboardsAPI.getDashboard(currentDashboard._id);
      setCurrentDashboard(currentDash);
    //reset
    setEntryList([]);
    setEntryGroup("");

    } else if (type==="category"){
      let currentDash = await dashboardsAPI.getDashboard(currentDashboard._id);
      setCurrentDashboard(currentDash);
    //reset
    setEntryList([]);
    setEntryGroup("");
    } else if (type==="entry-income"){
      //required to get filtered entries again
      let filteredEntries = await entriesAPI.getFilteredEntries(
        currentDashboard._id,
        { [entryType]: entryGroup }
      );
      setEntryList(filteredEntries);

    }else if (type ==="entry-category"){
      //required to get filtered entries again
      let filteredEntries = await entriesAPI.getFilteredEntries(
        currentDashboard._id,
        { [entryType]: entryGroup }
      );
      setEntryList(filteredEntries);
    }
    setShowEditForms(false)

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
        handleEntryEdit={handleEntryEdit}
        entryType={entryType}
        key={idx}
        entry={entry}
        showEditForms={showEditForms}
      />
    ));
  }

  return (
    <>
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
            {entryGroup ? (
              <>
                <h2>{entryGroup}</h2>
                <button
                  onClick={() => {
                    handleEntryEdit(entryType, entryGroupData);
                  }}
                >
                  rename
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="entry-section">
            {displayedEntries.length > 0 ? (
              displayedEntries
            ) : (
              <>
              {entryGroup? 
                <p>No Entries</p>:
                <p>No Entry Group Selected</p>}
              </>
            )}
          </div>
        </div>
        <div className="form-section">
          <div className="entry-header">Forms</div>
          <div>
            {showEditForms ? (
              <EditEntryForm
                editItemData={editItemData}
                currentDashboard={currentDashboard}
                handleEntryUpdate={handleEntryUpdate}
                setShowEditForms={setShowEditForms}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
