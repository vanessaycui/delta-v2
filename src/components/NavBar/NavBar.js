import "./NavBar.css";
export default function NavBar({
  handleLogoClick,
  handleSettingsClick,
  handleEntriesClick,
  handleBackClick,
  showEntries,
  showDashSettings,
  name,
  dashboardList,
}) {
  return (
    <nav className="NavBar">
      {!showDashSettings ? (
        <>
          {showEntries ? (
            <>
              <button className="btn-alt" onClick={handleBackClick}>
                {"<"} DASHBOARD
              </button>
              <h1>
                ALL ENTRIES FOR:{" "}
                <strong style={{ color: "var(--darkgreen)" }}>
                  {name ? name.toUpperCase() : ""}
                </strong>
              </h1>
            </>
          ) : (
            <>
              <div className="logo-btn-container">
                <button className="logo-btn" onClick={handleLogoClick}>
                  Δ
                </button>
              </div>
              <h1>{name ? name.toUpperCase() : ""}</h1>
              {dashboardList.length > 0 ? (
                <div>
                  <button className="btn-alt" onClick={handleEntriesClick}>
                    ALL ENTRIES
                  </button>
                  <button className="btn" onClick={handleSettingsClick}>
                    SETTINGS
                  </button>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <div className="logo-btn-container">
            <button className="logo-btn">Δ</button>
          </div>
          <h1>
            SETTINGS FOR:{" "}
            <strong style={{ color: "var(--darkgreen)" }}>
              {name ? name.toUpperCase() : ""}
            </strong>
          </h1>
        </>
      )}
    </nav>
  );
}
