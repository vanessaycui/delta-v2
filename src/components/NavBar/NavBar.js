import "./NavBar.css"
export default function NavBar({handleLogoClick, handleSettingsClick, handleEntriesClick, name, linkName}) {

    return (
      <nav className="NavBar">
        <button className="btn logo" onClick={handleLogoClick}>Δ</button>
       
        {name}

        <div>
        <button onClick={handleEntriesClick}>{linkName}</button>
        <button onClick={handleSettingsClick}>settings</button>
        </div>


      </nav>
    );
  }