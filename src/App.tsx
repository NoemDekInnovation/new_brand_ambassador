import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TalentSignUp from './components/talent/signUp/signup';
import SignUpDetails from './components/talent/signUp/signUpDetails';
import Login from './components/talent/login/login';
import LandingPage from './components/landingpage';

function App() {
  return ( 
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/auth/signup" element={< TalentSignUp/>} />
        <Route path="/auth/signup/details" element={< SignUpDetails/>} />
        <Route path="/auth/login" element={< Login/>} />
      </Routes>
    </Router> 
  );
}

export default App;
