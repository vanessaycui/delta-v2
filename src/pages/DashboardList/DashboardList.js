import {useState, useEffect} from "react"
import * as dashboardsAPI from '../../utilities/dashboards-api';

import SideNavBar from '../../components/SideNavBar/SideNavBar'
import NavBar from '../../components/NavBar/NavBar'

import "./DashboardList.css"

export default function DashboardList({user, setUser, showSideNav,handleLogoClick, currentDashboard, setCurrentDashboard}) {
  
    const [dashboardList, setDashboardList]=useState([])

    //get default dashboard from BE
    useEffect(function(){
      async function getallDash(){
        const allDash = await dashboardsAPI.getAll(user._id) //right now, just showing first dashboard found by mongoose in DB

        setDashboardList(allDash)
      }
      getallDash()
    })
  
    const populateDashboardList = dashboardList.map((dashboard, idx)=><div className="dashboard-box" key={idx} onClick={handleDashClick} id={dashboard._id}>{dashboard.title}</div>)


  function handleDashClick(evt){
    //handles when dashboard selected from sidenav.
    async function showDashboard(){
      const currDashboard = await dashboardsAPI.getDashboard(evt.target.id)
      setCurrentDashboard(currDashboard)
    }
    showDashboard()
  }
    
    return (
      <div className="DashboardList">
        <NavBar type="dash-list" handleLogoClick={handleLogoClick} name={currentDashboard.title} linkName={"All Entries"} link={"/entries"}/>
        <div className="dashboard-container">
        {populateDashboardList}
        </div>
      </div>
    );
  }