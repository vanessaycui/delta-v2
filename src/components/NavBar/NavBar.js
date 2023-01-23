import {Link} from 'react-router-dom'

import "./NavBar.css"
export default function NavBar({type, handleLogoClick, name, linkName, link}) {

    return (
      <nav className="NavBar">
        {type=="dash-list"?<></> : <button className="btn logo" onClick={handleLogoClick}>Δ</button>}
       
        {name}


        {type==""}<Link to={link}> {linkName}</Link>


      </nav>
    );
  }