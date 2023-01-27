import { useState } from "react";

import * as entriesAPI from "../../utilities/entries-api";

import "./EntryItem.css";

export default function EntryItem({ handleDeletedEntry, entryType, entry, handleEntryEdit, showEditForms}) {


  return (
    <div className="entry-box">

        <div className="identifiers">
        <p>{entryType ==="income"?"Income:":"Cost:"}</p>
        <p>Date:</p>
        <p>Company:</p>
        <p>Comment:</p>
        </div>
        <div className="info">
        <p>{entryType ==="income"?entry.income? entry.income.toFixed(2): 0:entry.cost? entry.cost.toFixed(2):0}</p>
        <p>{entry.date.slice(0, 10)}</p>
        <p>{entry.company}</p>
        <p>{entry.comment}</p>
        </div>
        
        <div className="entry-box-buttons">
          {showEditForms?<></>:<>
          <button className="btn" onClick={()=>{handleEntryEdit(`entry-${entryType}`, entry)}}> edit </button> 
          
          <button className="btn" onClick={()=>{handleDeletedEntry(entry._id)}}>delete</button>
          </>}
        </div>

    </div>
  )

}
