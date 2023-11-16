import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TalentSignUp from "./components/talent/signUp/signup";
import SignUpDetails from "./components/talent/signUp/signUpDetails";
import Login from "./components/talent/login/login";
import AgencyDashboard from "./components/agency/Dashboard";
import RequiredAuth from "./components/RequireAuth";

function App() {
  const ROLES: {
    Agency: string;
    Talent: string;
  } = {
    Agency: "agency",
    Talent: "talent",
  };

  return (
    <Router>
      <Routes>
        <Route path="/auth/signup" element={<TalentSignUp />} />
        <Route path="/auth/signup/details" element={<SignUpDetails />} />
        <Route path="/auth/login" element={<Login />} />

        <Route element={<RequiredAuth allowedRoles={[ROLES.Agency]} />}>
          <Route path="/dashboard" element={<AgencyDashboard />} />
        </Route>
        <Route element={<RequiredAuth allowedRoles={[ROLES.Talent]} />}>
          <Route path="/dashboard" element={<AgencyDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
