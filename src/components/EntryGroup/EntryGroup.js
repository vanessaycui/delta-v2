import "./EntryGroup.css";

export default function EntryGroup({
  entryType,
  entryData,
  handleEntryGroupSelection,
  handleEntryGroupDelete,
  handleEntryEdit,
  setEntryGroupData,
}) {

  function handleClick(){
    if (entryType==="income"){
      handleEntryGroupSelection(entryData.incomeType)
    } else if (entryType ==="category"){
      handleEntryGroupSelection(entryData.name) 
    }
    console.log(entryData)
    setEntryGroupData(entryData)
  }

  return (
    <>
      <div className="EntryGroup" onClick={handleClick}>
      <button className="btn"onClick={()=>{handleEntryGroupDelete(entryData._id)}}>x</button>
        <div >
          <p>{entryType === "income" ? entryData.incomeType : entryData.name}</p>
        </div>
        
      </div>
    </>
  );
}
