import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Header } from './components/Header';
import { StartPage } from './components/StartPage';
import { Results } from "./components/Results";
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { Team } from './pages/Team';
import { Contact } from './pages/Contact';


function App() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/start" element={<StartPage />} />
        <Route path="/results" element={<Results />} />
        
      </Routes>
    </Router>
  );
}

export default App;