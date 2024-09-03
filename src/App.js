import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginComponent from './components/DashboardComponent/LoginComponent';
import OtpComponent from './components/LoginComponent/OtpComponent';
import TotpLoginComponent from './components/LoginComponent/TotpLoginComponent';
import QrLogin from './components/LoginComponent/QrLoginComponent';
import Dashboard from './components/DashboardComponent/DashboardComponent';
import ConfirmationModal from './components/DashboardComponent/ConfirmationModalComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root path to /login */}
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/verify_otp" element={<OtpComponent />} />
        <Route path="/qr" element={<QrLogin />} />
        <Route path="/totp_login" element={<TotpLoginComponent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/confirm-generating" element={<ConfirmationModal />} />

        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;