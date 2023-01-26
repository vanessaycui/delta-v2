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
      {dashboard.title.toUpperCase()}
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
       {dashboardList.length>0?  <h3>{user.name.toUpperCase()}'S DASHBOARDS</h3> : <h3>Create your first dashboard here.</h3>}
      
      <div className="dashboard-container">{populateDashboardList}</div>
     
      <div className="create-dash-form-container">
      {showNewDashForm ? (<>
        
        <CreateDashboardForm
          setShowNewDashForm={setShowNewDashForm}
          setDashboardList={setDashboardList}
          dashboardList={dashboardList}
        />
        </>
      ) : (
        
        <button className="btn long-btn"onClick={handleShowDashForm}>+ DASHBOARD</button>
        
      )}
      </div>

      
      <div className="logout-box">
        <Link className="link-color" to="/" onClick={handleLogout}>
          {" "}
          LOGOUT{" "}
        </Link>
      </div>
    </nav>
  );
}
