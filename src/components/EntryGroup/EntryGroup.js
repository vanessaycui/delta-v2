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
      <div className="EntryGroup">
        <div onClick={handleClick}>
          {entryType === "income" ? entryData.incomeType : entryData.name}
        </div>
        <button onClick={()=>{handleEntryGroupDelete(entryData._id)}}>delete</button>
      </div>
    </>
  );
}
