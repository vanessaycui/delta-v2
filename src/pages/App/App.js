import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import * as dashboardsAPI from "../../utilities/dashboards-api";

import AuthPage from "../AuthPage/AuthPage";
import Dashboard from "../Dashboard/Dashboard";
import EntryPage from "../EntryPage/EntryPage";

import "./App.css";


export default function App() {
  const [user, setUser] = useState(getUser());


  return (
    <main className="App">
      {user ? (
        <>
          <Routes>
            <Route
              path="/dashboards"
              element={
                <Dashboard
                  user={user}
                  setUser={setUser}
                />
              }
           />
            <Route
              path="/entries"
              element={
                <EntryPage
                  user={user}
                  setUser={setUser}       
                />
              }
            />
            <Route path="/*" element={<Navigate to="/dashboards"></Navigate>} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
