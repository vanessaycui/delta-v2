import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";

import CreateDashboardForm from "../CreateDashboardForm/CreateDashboardForm";
import "./SideNavBar.css";

export default function SideNavBar({
  user,
  setUser,

  showSideNav,

  handleDashClick,
  dashboardList,

  setDashboardList,
}) {
  const [showNewDashForm, setShowNewDashForm] = useState(false);


  const populateDashboardList = dashboardList.map((dashboard, idx) => (
    <div
      className="dashboard-box"
      key={idx}
      onClick={handleDashClick}
      id={dashboard._id}
    >
      {dashboard.title}
    </div>
  ));

  function handleShowDashForm() {
    setShowNewDashForm(true);
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  return (
    <nav className="SideNavBar" style={{left: showSideNav? "0px": "-200px"}}>
      <div className="dashboard-container">{populateDashboardList}</div>

      {showNewDashForm ? (
        <CreateDashboardForm
          setShowNewDashForm={setShowNewDashForm}
          setDashboardList={setDashboardList}
          dashboardList={dashboardList}
        />
      ) : (
        <button onClick={handleShowDashForm}>Create New Dashboard</button>
      )}

      <div>Welcome, {user.name}</div>
      <div>
        <Link to="/" onClick={handleLogout}>
          {" "}
          Logout{" "}
        </Link>
      </div>
    </nav>
  );
}
