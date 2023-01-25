import { useEffect, useState } from "react";
import * as entriesAPI from "../../utilities/entries-api";

const today = new Date();

export default function EditEntryForm({
  editItemData,
  currentDashboard,
  handleEntryUpdate,
  setShowEditForms
}) {
  //tracking state of form
  const [incomeForm, setIncomeForm] = useState({
    incomeType: "",
    id: "",
  });

  const [catForm, setCatForm] = useState({
    name: "",
    id: "",
  });

  const [editCategoryEntry, setEditCategoryEntry] = useState({
    category: "",
    company: "",
    date: today.toISOString().slice(0, 10),
    cost: 0,
    comment: "",
  });

  const [editIncomeEntry, setEditIncomeEntry] = useState({
    incomeType: "",
    company: "",
    date: today.toISOString().slice(0, 10),
    income: 0,
    comment: "",
  });

  return (
    <div>
      <form>
      
        {editItemData.type === "income" ? (
          <>
          <label>Edit Income Group Name</label>
          <br/>
          <input value={editItemData.data.incomeType}required/>
          </>
    
        ) : (
          <>
            {editItemData.type === "category" ? (
              <>
              <label>Edit Category Group Name</label>
              <br/>
              <input value={editItemData.data.name}required/>
              </>
            ) : (
              <>
                {editItemData.type === "entry-income" ? (
                  <p>entry edit income form {editItemData.data._id}</p>
                ) : (
                  <>
                    {editItemData.type === "entry-category" ? (
                      <p>entry edit category form {editItemData.data._id}</p>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}

        <button>Edit</button>
        
      </form>
      <button onClick={()=>setShowEditForms(false)}>Cancel</button>
    </div>
  );
}
