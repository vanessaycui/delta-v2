import { useState } from "react";

import * as entriesAPI from "../../utilities/entries-api";

import "./EntryItem.css";

export default function EntryItem({ handleDeletedEntry, entryType, entry}) {


  function handleEditEntryForm(){

  }


  return (
    <div className="entry-box">
        <table>
            <tbody>
          <tr>
            {entryType ==="income"?
              <>
                <td>income:</td>
                <td>${entry.income? entry.income.toFixed(2): 0}</td>
              </>
              :
              <>
                <td>cost:</td>
                <td>${entry.cost? entry.cost.toFixed(2):0}</td>
              </>
            }
            </tr>
            <tr>
              <td>date:</td>
              <td>{entry.date}</td>
            </tr>
            <tr>
              <td>company:</td>
              <td>{entry.company}</td>
            </tr>
            <tr>
              <td>comment:</td>
              <td>{entry.comment}</td>
            </tr>
            </tbody>
          </table>
          <button> edit </button> 
          
          <button onClick={()=>{handleDeletedEntry(entry._id)}}>delete</button>

    </div>
  )

}
