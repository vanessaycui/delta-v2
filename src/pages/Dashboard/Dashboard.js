import { useState, useEffect } from "react";
import * as dashboardsAPI from "../../utilities/dashboards-api";

import SideNavBar from "../../components/SideNavBar/SideNavBar";
import NavBar from "../../components/NavBar/NavBar";
import DashSettings from "../../components/DashSettings/DashSettings";
import DashboardTable from "../../components/DashboardTable/DashboardTable"
import "./Dashboard.css";

export default function Dashboard({
  user,
  setUser, //logout functionality in side nav
}) {

  const [showEntries, setShowEntries]=useState(false)
  const [showDashSettings, setDashSettings]=useState(false)
  const [showSideNav, setShowSideNav] = useState(false);
  const [dashboardList, setDashboardList] = useState([]); //index function
  const [currentDashboard, setCurrentDashboard] = useState({});

  useEffect(function () { //get all dashboard and set curr dash
    async function getallDash() {
      const allDash = await dashboardsAPI.getAll(user._id)
      setDashboardList(allDash);
      setCurrentDashboard(allDash[0]); 
    }
    getallDash()
  }, [user]);

  function handleLogoClick() { //toggle side navigation
    showSideNav ? setShowSideNav(false) : setShowSideNav(true);
  }

  function handleDashClick(evt) { //handle dashboard selection
    async function showDashboard() {
      const currDashboard = await dashboardsAPI.getDashboard(evt.target.id);
      setCurrentDashboard(currDashboard);
    }
    showDashboard();
    setShowSideNav(false);
  }

  function handleSettingsClick(){
    showDashSettings ? setDashSettings(false) : setDashSettings(true);
  }

  function handleEntriesClick(){
    showEntries ? setShowEntries(false) : setShowEntries(true);
  }

  return (
    <div className="Dashboard">
      {showDashSettings? <DashSettings handleSettingsClick={handleSettingsClick} currentDashboard={currentDashboard} setCurrentDashboard={setCurrentDashboard}/>:(<>

      <NavBar
        handleLogoClick={handleLogoClick}
        handleSettingsClick={handleSettingsClick}
        handleEntriesClick={handleEntriesClick}
        name={currentDashboard && currentDashboard.title}
        linkName={"All Entries"}
      />
      <SideNavBar
        user={user}
        setUser={setUser}
        showSideNav={showSideNav}
        handleDashClick={handleDashClick}
        dashboardList={dashboardList}
        setDashboardList={setDashboardList}
      />
      
      <div className="dash-chart">
        chart
      </div>
      {Object.keys(currentDashboard).length ===0 ? <></>: <DashboardTable currentDashboard={currentDashboard} setCurrentDashboard={setCurrentDashboard}/>}
      </>)}
    </div>
  );
}
