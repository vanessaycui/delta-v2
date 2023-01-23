import { useState, useEffect } from "react";
import * as dashboardsAPI from "../../utilities/dashboards-api";

import SideNavBar from "../../components/SideNavBar/SideNavBar";
import NavBar from "../../components/NavBar/NavBar";

import "./Dashboard.css";

export default function Dashboard({
  user,
  setUser, //logout functionality in side nav
  
  // currentDashboard,
  // setCurrentDashboard,

  // dashboardList,
  // setDashboardList
}) {
  const [showSideNav, setShowSideNav] = useState(false);
  const [dashboardData, setDashboardData] = useState({}); //show function
  const [dashboardList, setDashboardList] = useState([]); //index function
  const [currentDashboard, setCurrentDashboard] = useState({});

  useEffect(function () {
    //initial retrieval of all dashboards, and set current dash upon load
    async function getallDash() {
      const allDash = await dashboardsAPI.getAll(user._id)
      setDashboardList(allDash);
      setCurrentDashboard(allDash[0]); //assumes you have a dash already.
    }

    async function getCurrentDash(){
      const data = await dashboardsAPI.getDashboard(currentDashboard._id)
      setDashboardData(data)
      console.log(dashboardData)

    }
    //we initialize dashboard list and current dashboard
    getallDash()
    getCurrentDash()

  }, []);


  useEffect(()=>{ //inital retrieval of dashboard data
    async function getCurrentDash(){
      const data = await dashboardsAPI.getDashboard(currentDashboard._id)
      setDashboardData(data)
    }
    getCurrentDash()
    console.log(dashboardData)
  },[currentDashboard])

  function handleLogoClick() {
    //toggles showing sideNav
    showSideNav ? setShowSideNav(false) : setShowSideNav(true);
  }

  function handleDashClick(evt) {
    //handles when dashboard selected from sidenav, sets current dash, gets dash data
    async function showDashboard() {
      const currDashboard = await dashboardsAPI.getDashboard(evt.target.id);
      setCurrentDashboard(currDashboard.dashboard);
      setDashboardData(currDashboard);
    }
    showDashboard();
    setShowSideNav(false);
    
  
  }

 

  return (
    <div className="Dashboard">
      <NavBar
        handleLogoClick={handleLogoClick}
        name={currentDashboard.title}
        linkName={"All Entries"}
        link={"/entries"}
      />

      <SideNavBar
        user={user}
        setUser={setUser}
        showSideNav={showSideNav}
        handleDashClick={handleDashClick}
        dashboardList={dashboardList}
        setDashboardList={setDashboardList}
      />
    </div>
  );
}
