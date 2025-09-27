import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppointmentForm } from './components/AppointmentForm';
import { AppointmentSuccess } from './components/AppointmentSuccess';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/:workshop" element={<AppointmentForm />} />
          <Route path="/:workshop/success" element={<AppointmentSuccess />} />
          {/* Fallback route for root path - redirects to a default workshop */}
          <Route path="/" element={<AppointmentForm />} />
          <Route path="/success" element={<AppointmentSuccess />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
