import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { Button } from './components/Button';
import { LogIn } from './components/LogIn';

function App() {
  return (
    <Router>
      <Routes>

        {/* Página principal */}
        <Route
          path="/"
          element={
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Edit <code>src/App.js</code> and save to reload.</p>

                {/* Botón que navega a login */}
                <Link to="/login">
                  <Button className="m-4 p-2">Log In</Button>
                </Link>

                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
            </div>
          }
        />

        {/* Página de login */}
        <Route path="/login" element={<LogIn />} />

      </Routes>
    </Router>
  );
}

export default App;
