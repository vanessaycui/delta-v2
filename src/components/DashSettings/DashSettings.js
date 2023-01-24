import * as dashboardsAPI from "../../utilities/dashboards-api";

import "./DashSettings.css"

export default function DashSettings({currentDashboard, setCurrentDashboard, handleSettingsClick}) {

    function handleDashDelete(){

    }

    return (
        <>
        <div>
            <h1> Dashboard Settings for {currentDashboard.title} </h1>
        </div>
      <div className="DashSettings">
        
        <div>
                <p>Edit Dashboard Name:</p> 
        </div>
            <div className="form">
                <form autoComplete="off">
                    <input required value={currentDashboard.title} />
                    <button>Edit</button>
                </form>
            </div>
            <div>
                <p>I want to delete this dashboard </p>
            </div>
            <div className="form">

                <button onClick={handleDashDelete}>Delete</button>

            </div>
            <div></div>
            <div className="form"><button onClick={handleSettingsClick}>Cancel</button></div>
      </div>
      </>
    );
  }