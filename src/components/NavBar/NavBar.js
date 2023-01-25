import "./NavBar.css";
export default function NavBar({
  handleLogoClick,
  handleSettingsClick,
  handleEntriesClick,
  handleBackClick,
  showEntries,
  showDashSettings,
  name,
  linkName,
}) {
  return (
    <nav className="NavBar">
      {!showDashSettings ? (<>
          
            {showEntries ? 
              <><button onClick={handleBackClick}>back to dashboard</button></>
            : (<>
              <button className="btn logo" onClick={handleLogoClick}>
            Δ
          </button>
          {name}

              <div>
         
                <button onClick={handleEntriesClick}>{linkName}</button>
                <button onClick={handleSettingsClick}>settings</button>
          
              </div>
              </>
            )}
          
        </>
      ) : (
        <button className="btn logo">Δ</button>
      )}
    </nav>
  );
}
