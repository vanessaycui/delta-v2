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



  useEffect(function () {
    //get all dashboard and set curr dash
    async function getallDash() {
      const allDash = await dashboardsAPI.getAll(user._id);
      setDashboardList(allDash);
      setCurrentDashboard(allDash[0]);
    }
    getallDash();

  }, []);

  function handleLogoClick() {
    //toggle side navigation
    showSideNav ? setShowSideNav(false) : setShowSideNav(true);
  }

  function handleDashClick(evt) {
    //handle dashboard selection
    async function showDashboard() {
      const currDashboard = await dashboardsAPI.getDashboard(evt.target.id);
      setCurrentDashboard(currDashboard);
      setShowEntryForm(false);
    }
    showDashboard();
    setShowSideNav(false);
  }

  function handleSettingsClick() {
    showDashSettings ? setDashSettings(false) : setDashSettings(true);
    setShowSideNav(false);
  }

  function handleEntriesClick() {
    showEntries ? setShowEntries(false) : setShowEntries(true);
    setShowSideNav(false);
  }

  function handleBackClick() {
    showEntries ? setShowEntries(false) : setShowEntries(true);
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
                  <DashboardChart currentDashboard={currentDashboard} />
                )}
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
    </div>
  );
}
