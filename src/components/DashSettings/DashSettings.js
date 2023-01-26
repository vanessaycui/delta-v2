
import {useState} from 'react'
import * as dashboardsAPI from "../../utilities/dashboards-api";

import "./DashSettings.css"

export default function DashSettings({currentDashboard, setCurrentDashboard, setDashboardList, dashboardList, handleSettingsClick}) {
    const [updateDashInfo, setUpdateDashInfo]= useState({
        title:(currentDashboard? currentDashboard.title: "")
    })

    async function handleDashDelete(){
        let dashboardList = await dashboardsAPI.deleteDashboard(currentDashboard._id)
        setCurrentDashboard(dashboardList[0])
        setDashboardList(dashboardList)
        handleSettingsClick()
    }

    async function handleDashUpdate(evt){ //update dashboard.
        evt.preventDefault();
        let updatedDash = await dashboardsAPI.updateDashboard(currentDashboard._id, updateDashInfo)
        setCurrentDashboard(updatedDash.dashboard)
        setDashboardList(updatedDash.dashboards)
        handleSettingsClick()
    }

    function handleChange(evt){
        setUpdateDashInfo({title:evt.target.value})
    }

    return (
        <>
      <div className="DashSettings">
        
        <div>
                <p>Edit Dashboard Name:</p> 
        </div>
            <div className="form">
                <form autoComplete="off" onSubmit={handleDashUpdate}>
                    <input required value={updateDashInfo.title} onChange={handleChange}/>
                    <button className="btn"type="submit">Edit</button>
                </form>
            </div>
            {dashboardList.length >1? (<>
            <div>
                <p>I want to delete this dashboard </p>
            </div>
            <div className="form">
                <button className="btn"onClick={handleDashDelete}>Delete</button>
            </div>
            </>
            ):
            <></>}
            <div></div>
            <div className="form"><button className="btn-alt" onClick={handleSettingsClick}>Cancel</button></div>
      </div>
      </>
    );
  }