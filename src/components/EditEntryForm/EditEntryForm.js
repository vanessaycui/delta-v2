import { useEffect, useState } from "react";
import * as entriesAPI from "../../utilities/entries-api";
import * as incomesAPI from "../../utilities/incomes-api";
import * as categoriesAPI from "../../utilities/categories-api";
import "./EditEntryForm.css"

const today = new Date();

export default function EditEntryForm({
  editItemData,
  currentDashboard,
  handleEntryUpdate,
  setShowEditForms,
}) {
  //tracking state of form
  const [groupForm, setGroupForm] = useState({
    incomeType: (editItemData.data.incomeType ||= ""),
    name: (editItemData.data.name ||= ""),
    id: (editItemData.data._id ||= ""),
  });

  const [editEntry, setEditEntry] = useState({
    id: (editItemData.data._id ||= ""),
    category: (editItemData.data.category ||= ""),
    incomeType: (editItemData.data.incomeType ||= ""),
    company: (editItemData.data.company ||= ""),
    date: (editItemData.data.date ||= today.toISOString()),
    cost: (editItemData.data.cost ||= 0),
    income: (editItemData.data.income ||= 0),
    comment: (editItemData.data.comment ||= ""),
  });

  function handleGroupFormChange(evt) {
    setGroupForm({ ...groupForm, [evt.target.name]: evt.target.value });
  }

  function handleEntryFormChange(evt) {
    setEditEntry({ ...editEntry, [evt.target.name]: evt.target.value });
  }

  async function handleGroupFormSubmit(evt) { //handles updating incomes/category group names
    evt.preventDefault();
    if (editItemData.type=== "income") {
      await incomesAPI.updateIncome(currentDashboard._id, groupForm.id, groupForm)
    } else if (editItemData.type === "category") {
      await categoriesAPI.updateCategory(currentDashboard._id, groupForm.id, groupForm)
    }
    handleEntryUpdate(editItemData.type)
  }

  async function handleEntryFormSubmit(evt){
    evt.preventDefault();
    if (editItemData.type === "entry-income") {
      await entriesAPI.updateIncomeEntry(currentDashboard._id,editEntry.id,editEntry)
      //put for income
    } else if (editItemData.type === "entry-category") {
      await entriesAPI.updateCategoryEntry(currentDashboard._id,editEntry.id,editEntry)
      //put for category
    }
    handleEntryUpdate(editItemData.type)
  }

  return (
    <div>
      {/* edit income and category entry group name  */}
      
      {editItemData.type === "income" ? (
        <>
        <h1>RENAME</h1>
          <form name="income" onSubmit={handleGroupFormSubmit}>
            <label>Edit Income Group Name</label>
            <br />
            <input
             className="input-space"
              name="incomeType"
              value={groupForm.incomeType}
              onChange={handleGroupFormChange}
              required
            />
            <br/>
            <button className="btn" type="submit">RENAME</button>
            <button className="btn" onClick={() => setShowEditForms(false)}>CANCEL</button>
          </form>
        </>
      ) : (
        <>
          {editItemData.type === "category" ? (
            <>
            <h1>RENAME</h1>
              <form name="category" onSubmit={handleGroupFormSubmit}>
                <label>Edit Category Group Name</label>
                <br />
                <input
                  className="input-space"
                  name="name"
                  value={groupForm.name}
                  onChange={handleGroupFormChange}
                  required
                />
                <br/>
                <button className="btn" type="submit">RENAME</button>
                <button className="btn" onClick={() => setShowEditForms(false)}>CANCEL</button>
              </form>
            </>
          ) : (
            // edit Entries.
            <>
              {editItemData.type === "entry-income" ? (
                <>
                <h1>EDIT ENTRY</h1>
                  <form name="income" onSubmit={handleEntryFormSubmit}>
                    <label>Company:</label>
                    <br/>
                    <input
                    className="input-space"
                      name="company"
                      required
                      value={editEntry.company}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                    <label>date:</label>
                    <br/>
                    <input
                    className="input-space"
                      type="date"
                      name="date"
                      required
                      value={editEntry.date.slice(0, 10)}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                    
                    <label>income:</label>
                    <br/>
                    <input
                    className="input-space"
                      type="number"
                      name="income"
                      required
                      value={editEntry.income}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                    <label>comment</label>
                    <br/>
                    <input
                    className="input-space"
                      type="text"
                      name="comment"
                      value={editEntry.comment}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                    <button className="btn" type="submit">EDIT</button>
                    <button className="btn" onClick={() => setShowEditForms(false)}>CANCEL</button>
                  </form>
                </>
              ) : (
                <>
                  {editItemData.type === "entry-category" ? (
                    <>
                    <h1>EDIT ENTRY</h1>
                    <form name="category" onSubmit={handleEntryFormSubmit}>
                    <label>Company:</label>
                    <br/>
                    <input
                    className="input-space"
                      name="company"
                      required
                      value={editEntry.company}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                    <label>date:</label>
                    <br/>
                    <input
                      type="date"
                      name="date"
                      required
                      value={editEntry.date.slice(0, 10)}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                    <label>cost:</label>
                    <br/>
                    <input
                    className="input-space"
                      type="number"
                      name="cost"
                      required
                      value={editEntry.cost}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                  
                    <label>comment</label>
                    <br/>
                    <input
                    className="input-space"
                      type="text"
                      name="comment"
                      value={editEntry.comment}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                    <button className="btn" type="submit">EDIT</button>
                    <button className="btn" onClick={() => setShowEditForms(false)}>CANCEL</button>
                  </form>
                  </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}

      

    </div>
  );
}
