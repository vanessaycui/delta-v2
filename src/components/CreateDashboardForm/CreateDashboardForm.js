import { useState } from 'react';
import * as dashboardsAPI from '../../utilities/dashboards-api.js';

import "./CreateDashboardForm.css"

export default function CreateDashboardForm({setShowNewDashForm}) {
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
            console.log(dashboard)

        } catch {
            setError('Create New Dashboard Failed - Try Again');
        }
    }

  return (
    <div>
      <div className="CreateDashboardForm">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>New Dashboard Title</label>
          <input type="text" name="title" value={newDashboard.title} onChange={handleChange} required />
          <button className="btn" type="submit">Done</button>
          <p className="error-message">&nbsp;{error}</p>
        </form>
      </div>
    </div>
  );
}