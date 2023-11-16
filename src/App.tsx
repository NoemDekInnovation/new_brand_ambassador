import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TalentSignUp from './components/talent/signUp/signup';
import SignUpDetails from './components/talent/signUp/signUpDetails';
import Login from './components/talent/login/login';
import LandingPage from './components/landingpage';
import ForgotPassword from './components/forgotPassword/forgotPassword';
import EmailCode from './components/forgotPassword/emailCode';
import ResetPassword from './components/forgotPassword/resetPassword';
import VerifyEmail from './components/verifyEmail/verifyEmail';
import NewPassword from './components/forgotPassword/newPassword';
import Verification from './components/forgotPassword/otpVerification';

function App() {
  return ( 
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/auth/signup" element={< TalentSignUp/>} />
        <Route path="/auth/signup/details" element={< SignUpDetails/>} />
        <Route path="/auth/login" element={< Login/>} />
        <Route path="/auth/login/forgot-password" element={< ForgotPassword/>} />
        <Route path="/auth/login/email" element={< EmailCode/>} />
        <Route path="/auth/login/reset-password" element={< ResetPassword/>} />
        <Route path="/auth/signup/verify-email" element={< VerifyEmail/>} />
        <Route path="/auth/login/reset-password/verification" element={< Verification/>} />
        <Route path="/auth/login/verification" element={< Verification/>} />
        <Route path="/auth/login/reset-password/password" element={< NewPassword/>} />
      </Routes>
    </Router> 
  );
}

export default App;
