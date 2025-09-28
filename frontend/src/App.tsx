import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WorkshopList } from './components/WorkshopList';
import { AppointmentForm } from './components/AppointmentForm';
import { AppointmentSuccess } from './components/AppointmentSuccess';
import UserRegistrationForm from './components/UserRegistrationForm';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AppointmentCalendarPage from './components/AppointmentCalendarPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WorkshopList />} />
          <Route path="/register" element={<UserRegistrationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<AppointmentCalendarPage />} />
          <Route path="/:workshop" element={<AppointmentForm />} />
          <Route path="/:workshop/success" element={<AppointmentSuccess />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
