import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import * as userService from '../../utilities/users-service'
import * as dashboardsAPI from '../../utilities/dashboards-api'

import CreateDashboardForm from '../CreateDashboardForm/CreateDashboardForm'
import './SideNavBar.css'


export default function SideNavBar({user, setUser, handleDashClick}) {

    const [showNewDashForm, setShowNewDashForm]= useState(false)
   
    function handleShowDashForm(){
        setShowNewDashForm(true)
    }
        
    function handleLogout(){
        userService.logout()
        setUser(null)
    }
    return (
      <nav className="SideNavBar">
        
        {showNewDashForm? 
        <CreateDashboardForm setShowNewDashForm={setShowNewDashForm}/> :
        <button onClick={handleShowDashForm}>Create New Dashboard</button>
        }
              
        <div>
        Welcome, {user.name}</div>
        <div>
            <Link to="" onClick={handleLogout}> Logout </Link>
        </div>
      </nav>
    );
  }