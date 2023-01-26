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
          <form name="income" onSubmit={handleGroupFormSubmit}>
            <label>Edit Income Group Name</label>
            <br />
            <input
              name="incomeType"
              value={groupForm.incomeType}
              onChange={handleGroupFormChange}
              required
            />
            <button type="submit">Rename</button>
          </form>
        </>
      ) : (
        <>
          {editItemData.type === "category" ? (
            <>
              <form name="category" onSubmit={handleGroupFormSubmit}>
                <label>Edit Category Group Name</label>
                <br />
                <input
                  name="name"
                  value={groupForm.name}
                  onChange={handleGroupFormChange}
                  required
                />
                <button type="submit">Rename</button>
              </form>
            </>
          ) : (
            // edit Entries.
            <>
              {editItemData.type === "entry-income" ? (
                <>
                  <form name="income" onSubmit={handleEntryFormSubmit}>
                    <label>Company:</label>
                    <input
                      name="company"
                      required
                      value={editEntry.company}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                    <label>date:</label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={editEntry.date.slice(0, 10)}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                    
                    <label>income: $</label>
                    <input
                      type="number"
                      name="income"
                      required
                      value={editEntry.income}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                    <label>comment</label>
                    <input
                      type="text"
                      name="comment"
                      value={editEntry.comment}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                    <button type="submit">Edit</button>
                  </form>
                </>
              ) : (
                <>
                  {editItemData.type === "entry-category" ? (
                    <>
                    <form name="category" onSubmit={handleEntryFormSubmit}>
                    <label>Company:</label>
                    <input
                      name="company"
                      required
                      value={editEntry.company}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                    <label>date:</label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={editEntry.date.slice(0, 10)}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                    <label>cost: $</label>
                    <input
                      type="number"
                      name="cost"
                      required
                      value={editEntry.cost}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                  
                    <label>comment</label>
                    <input
                      type="text"
                      name="comment"
                      value={editEntry.comment}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                    <button type="submit">Edit</button>
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

      <button onClick={() => setShowEditForms(false)}>Cancel</button>

    </div>
  );
}
