import {useState, useEffect} from "react"
import * as dashboardsAPI from '../../utilities/dashboards-api';

import SideNavBar from '../../components/SideNavBar/SideNavBar'
import NavBar from '../../components/NavBar/NavBar'

import "./Dashboard.css"

export default function Dashboard({user, setUser, showSideNav,handleLogoClick, currentDashboard, setCurrentDashboard}) {
  
  

  function handleDashClick(evt){
    //handles when dashboard selected from sidenav.
    async function showDashboard(){
      const currDashboard = await dashboardsAPI.getDashboard(evt.target.id)
      setCurrentDashboard(currDashboard)
    }
    showDashboard()
  }


    
    return (
      <div className="Dashboard">
        <NavBar handleLogoClick={handleLogoClick} name={currentDashboard.title} linkName={"All Entries"} link={"/entries"}/>
        {showSideNav?
          <SideNavBar user = {user} setUser={setUser} handleDashClick={handleDashClick}/>
        :
        <></>
        }
      </div>
    );
  }