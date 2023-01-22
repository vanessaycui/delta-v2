import { useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'

import AuthPage from "../AuthPage/AuthPage"
import NavBar from "../../components/NavBar/NavBar"

import './App.css';

export default function App() {
  const [user, setUser]=useState(getUser())
  console.log(user)

  return (
    <main className="App">
      {user? 
        (
          <>
            <NavBar username = {user.name} setUser={setUser}/>
            <Routes>
              <Route path='/*' element={<Navigate to="/orders"></Navigate>}/>
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

