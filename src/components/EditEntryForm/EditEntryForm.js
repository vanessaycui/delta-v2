import { useEffect, useState } from "react";
import * as entriesAPI from "../../utilities/entries-api";

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
    setEditEntry({ ...groupForm, [evt.target.name]: evt.target.value });
  }

  function handleGroupFormSubmit(evt) {
    evt.preventDefault();
    if (evt.target.name === "income") {
      //put for income
    } else if (evt.target.name === "category") {
      //put for category
    }
  }

  return (
    <div>
      {/* edit income and category entry group name  */}
      {editItemData.type === "income" ? (
        <>
          <form name="income">
            <label>Edit Income Group Name</label>
            <br />
            <input
              name="incomeType"
              value={groupForm.incomeType}
              onChange={handleGroupFormChange}
              required
            />
            <button type="submit">Edit</button>
          </form>
        </>
      ) : (
        <>
          {editItemData.type === "category" ? (
            <>
              <form name="category">
                <label>Edit Category Group Name</label>
                <br />
                <input
                  name="name"
                  value={groupForm.name}
                  onChange={handleGroupFormChange}
                  required
                />
                <button type="submit">Edit</button>
              </form>
            </>
          ) : (
            // edit Entries.
            <>
              {editItemData.type === "entry-income" ? (
                <>
                  <form>
                    <label>Income Type:</label>
                    <input
                      name="incomeType"
                      required
                      value={editEntry.incomeType}
                      onChange={handleEntryFormChange}
                    />
                    <br />
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
                      required
                      value={editEntry.comment}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                    <button>Edit</button>
                  </form>
                </>
              ) : (
                <>
                  {editItemData.type === "entry-category" ? (
                    <>
                    <form>
                    <label>Category:</label>
                    <input
                      name="category"
                      required
                      value={editEntry.category}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                  
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
                      required
                      value={editEntry.comment}
                      onChange={handleEntryFormChange}
                    />
                    <br />
                    <button>Edit</button>
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
