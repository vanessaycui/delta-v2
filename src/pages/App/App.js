import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import * as dashboardsAPI from '../../utilities/dashboards-api'

import AuthPage from "../AuthPage/AuthPage"
import DashboardList from "../DashboardList/DashboardList";
import EntryPage from "../EntryPage/EntryPage";

import './App.css';



export default function App() {
  const [user, setUser]=useState(getUser())
  const [showSideNav, setShowSideNav] = useState(false)
  const [currentDashboard, setCurrentDashboard]=useState({})

  function handleLogoClick(){ //toggles showing sideNav
    showSideNav? setShowSideNav(false) : setShowSideNav(true)
  }

  // //get default dashboard from BE
  // useEffect(function(){
  //   async function getDefaultDash(){
  //     const defaultDash = await dashboardsAPI.getByAdminId(user._id) //right now, just showing first dashboard found by mongoose in DB
  //     //retrieve dashboard details
  //     // const dashDetails = await dashboardsAPI.show()
  //     setCurrentDashboard(defaultDash[0])
  //   }
  //   if (user){
  //     getDefaultDash()
  //   }
  
  // },[])


  return (
    <main className="App">
      {user? 
        (
          <>
            <Routes>
              <Route path='/dashboards' element={<DashboardList currentDashboard={currentDashboard}setCurrentDashboard={setCurrentDashboard} user={user} setUser={setUser} showSideNav={showSideNav} handleLogoClick={handleLogoClick}/>} />
              <Route path='/entries' element={<EntryPage user={user} setUser={setUser} currentDashboard={currentDashboard}/>}/>
              <Route path='/*' element={<Navigate to="/dashboards"></Navigate>}/>
            </Routes>
          </>
        )
        :
        (
        <AuthPage setUser={setUser}/>
        )
      }

    </main>
  );
}

