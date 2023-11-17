import React from "react";
import "./App.css";
import AgencyDashboard from "./components/agency/Dashboard";
import RequiredAuth from "./components/RequireAuth";
import "./App.css";

import TalentDashboard from "./components/talent/Dashboard";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TalentSignUp from "./components/talent/signUp/signup";
import SignUpDetails from "./components/talent/signUp/signUpDetails";
import Login from "./components/talent/login/login";
import LandingPage from "./components/landingpage";
import ForgotPassword from "./components/forgotPassword/forgotPassword";
import EmailCode from "./components/forgotPassword/emailCode";
import ResetPassword from "./components/forgotPassword/resetPassword";
import VerifyEmail from "./components/verifyEmail/verifyEmail";
import NewPassword from "./components/forgotPassword/newPassword";
import Verification from "./components/forgotPassword/otpVerification";
import LoginVerification from "./components/forgotPassword/loginVerification";

function App() {
  const ROLES: {
    Agency: string;
    Talent: string;
  } = {
    Agency: "agency",
    Talent: "talent",
  };

  const { user } = useSelector((state: RootState) => state.user);

  return (
    <Router>
      <Routes>
        {user?.accountId === "agency" && (
          <Route element={<RequiredAuth allowedRoles={[ROLES.Agency]} />}>
            <Route path="/dashboard" element={<AgencyDashboard />} />
          </Route>
        )}
        {user?.accountId === "talent" && (
          <Route element={<RequiredAuth allowedRoles={[ROLES.Talent]} />}>
            <Route path="/dashboard" element={<TalentDashboard />} />
          </Route>
        )}
        <Route path="/auth/signup" element={<TalentSignUp />} />
        <Route path="/auth/signup/details" element={<SignUpDetails />} />
        <Route path="/auth/login" element={<Login />} />
        <Route
          path="/auth/login/forgot-password"
          element={<ForgotPassword />}
        />
        <Route path="/auth/login/email" element={<EmailCode />} />
        <Route path="/auth/login/reset-password" element={<ResetPassword />} />
        <Route path="/auth/signup/verify-email" element={<VerifyEmail />} />
        <Route
          path="/auth/login/reset-password/verification"
          element={<Verification />}
        />
        <Route
          path="/auth/login/verification"
          element={<LoginVerification />}
        />
        <Route
          path="/auth/login/reset-password/password"
          element={<NewPassword />}
        />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
