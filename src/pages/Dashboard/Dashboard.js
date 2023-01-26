import { useState, useEffect } from "react";
import * as dashboardsAPI from "../../utilities/dashboards-api";
import * as entriesAPI from "../../utilities/entries-api";

import SideNavBar from "../../components/SideNavBar/SideNavBar";
import NavBar from "../../components/NavBar/NavBar";
import DashSettings from "../../components/DashSettings/DashSettings";
import DashboardTable from "../../components/DashboardTable/DashboardTable";
import Entries from "../../components/Entries/Entries";
import DashboardChart from "../../components/DashboardChart/DashboardChart";
import "./Dashboard.css";

export default function Dashboard({
  user,
  setUser, //logout functionality in side nav
  dashboardList,
  setDashboardList,
  currentDashboard,
  setCurrentDashboard,
}) {
  const [showEntries, setShowEntries] = useState(false);
  const [showDashSettings, setDashSettings] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [showPieChart, setShowPieChart]=useState(false)

  useEffect(function () {//side-nav: get all dashboards assoc. w user and set current dashboard
    async function getallDash() {
      const allDash = await dashboardsAPI.getAll(user._id);
      setDashboardList(allDash);
      setCurrentDashboard(allDash[0]);
    }
    getallDash();
  }, []);

  function handleChartSwitch(){ //dashboard: toggle betwen pie chart and bar chart
    showPieChart? setShowPieChart(false): setShowPieChart(true)
  }

  function handleLogoClick() { //dashboard: toggle side navigation
    showSideNav ? setShowSideNav(false) : setShowSideNav(true);
  }

  function handleDashClick(evt) {//side-nav: handle dashboard selection 
    async function showDashboard() {
      const currDashboard = await dashboardsAPI.getDashboard(evt.target.id);
      setCurrentDashboard(currDashboard);
      setShowEntryForm(false);
    }
    showDashboard();
    setShowSideNav(false);
  }

  function handleSettingsClick() { //dashboard: settings button
    showDashSettings ? setDashSettings(false) : setDashSettings(true);
    setShowSideNav(false);
    setShowEntryForm(false)
  }

  function handleEntriesClick() {//dashboard: entries button
    showEntries ? setShowEntries(false) : setShowEntries(true);
    setShowSideNav(false);
    setShowEntryForm(false)
  }

  function handleBackClick() { //entries: go back to dashboard button
    showEntries ? setShowEntries(false) : setShowEntries(true);
    setShowEntryForm(false)
  }

  return (
    <div className="Dashboard">
      <NavBar
        handleLogoClick={handleLogoClick}
        handleSettingsClick={handleSettingsClick}
        handleEntriesClick={handleEntriesClick}
        handleBackClick={handleBackClick}
        showEntries={showEntries}
        showDashSettings={showDashSettings}
        name={currentDashboard && currentDashboard.title}
        dashboardList={dashboardList}
      />
      <SideNavBar
        user={user}
        setUser={setUser}
        showSideNav={showSideNav}
        handleDashClick={handleDashClick}
        dashboardList={dashboardList}
        setDashboardList={setDashboardList}
      />
      {dashboardList.length>0 ?(<>
      {showDashSettings ? (
        <DashSettings
          handleSettingsClick={handleSettingsClick}
          currentDashboard={currentDashboard}
          setCurrentDashboard={setCurrentDashboard}
          dashboardList={dashboardList}
          setDashboardList={setDashboardList}
        />
      ) : (
        <>
          {showEntries ? (
            <Entries
              currentDashboard={currentDashboard}
              setCurrentDashboard={setCurrentDashboard}
            />
          ) : (
            <>
              <div className="dash-chart">
                {Object.keys(currentDashboard).length === 0 ? (
                  <></>
                ) : (
                  <DashboardChart currentDashboard={currentDashboard} showPieChart={showPieChart} />
                )}
                <button onClick={handleChartSwitch}>{showPieChart? "Bar Chart":"Pie Chart"}</button>
              </div>
              {Object.keys(currentDashboard).length === 0 ? (
                <></>
              ) : (
                <DashboardTable
                  currentDashboard={currentDashboard}
                  setCurrentDashboard={setCurrentDashboard}
                  showEntryForm={showEntryForm}
                  setShowEntryForm={setShowEntryForm}
                />
              )}
            </>
          )}
        </>
      )}
      </>):<>You have no dashboards. Create a new one to start.</>}
    </div>
  );
}
