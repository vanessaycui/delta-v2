import {useState} from "react"

import NavBar from "../../components/NavBar/NavBar";
import "./EntryPage.css"

export default function EntryPage({handleLogoClick, currentDashboard}) {
  
    
    return (
      <div className="EntryPage">
        <NavBar handleLogoClick={handleLogoClick} name={"all entries for "+currentDashboard.title} linkName={""} link={""}/>

      </div>
    );
  }