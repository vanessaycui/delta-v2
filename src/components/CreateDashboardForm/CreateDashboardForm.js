import { useState } from 'react';
import * as dashboardsAPI from '../../utilities/dashboards-api.js';

import "./CreateDashboardForm.css"

export default function CreateDashboardForm({setShowNewDashForm, dashboardList, setDashboardList}) {
    const [newDashboard, setNewDashboard] = useState({
        title:""
    })

    const [error, setError] = useState('');

    function handleChange(evt){
        setNewDashboard({[evt.target.name]: evt.target.value})
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        setShowNewDashForm(false) //hide dash form and show create new dash button after submitting form
        try {
            const dashboard = await dashboardsAPI.createDashboard(newDashboard);
            setDashboardList([...dashboardList, dashboard])
        } catch {
            console.log('Create New Dashboard Failed - Try Again');
        }
    }

    function handleCancel(evt){
      evt.preventDefault();
      setShowNewDashForm(false)
    }

  return (
    <div>
      <div className="CreateDashboardForm">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div>
          <label>New Dashboard Title</label>
          <input className="input-space"type="text" name="title" value={newDashboard.title} onChange={handleChange} required />
          </div>
          <button className="btn" type="submit">Done</button>
          <button className="btn" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
}