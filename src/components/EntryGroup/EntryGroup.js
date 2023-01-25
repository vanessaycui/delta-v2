import "./EntryGroup.css";

export default function EntryGroup({
  entryType,
  entryData,
  handleEntryGroupSelection,
  handleEntryGroupDelete,
  handleEntryEdit
}) {
  return (
    <>
      <div className="EntryGroup">
        <div onClick={handleEntryGroupSelection}>
          {entryType === "income" ? entryData.incomeType : entryData.name}
        </div>
        <div>
          <button onClick={()=>{handleEntryEdit(entryType, entryData)}}>edit</button>
          <button onClick={()=>{handleEntryGroupDelete(entryData._id)}}>delete</button>
        </div>
      </div>
    </>
  );
}
