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
  dashboardList,
}) {
  return (
    <nav className="NavBar">
      {!showDashSettings ? (
        <>
          {showEntries ? (
            <>
              <button onClick={handleBackClick}>back to dashboard</button>
            </>
          ) : (
            <>
              <div className="logo-btn-container">
                <button className="logo-btn" onClick={handleLogoClick}>
                  Δ
                </button>
              </div>

              {name}
              {dashboardList.length > 0 ? (
                <div>
                  <button onClick={handleEntriesClick}>{linkName}</button>
                  <button onClick={handleSettingsClick}>settings</button>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      ) : (
        <button className="btn logo">Δ</button>
      )}
    </nav>
  );
}
