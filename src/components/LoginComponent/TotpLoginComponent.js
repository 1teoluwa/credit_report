import React, { useState } from 'react';
import axios from 'axios';
import './LoginComponent.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const TotpLoginComponent = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/verify_totp_login`, {
        totp_token: otp,  // Make sure this matches the Flask backend
      }, {
        withCredentials: true,  // Include credentials like cookies if necessary
      });

      if (response.status === 200) {
        console.log("TOTP verified successfully");
        window.location.href = '/dashboard'; // Redirect to the dashboard
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid TOTP. Please try again.');
      } else {
        setError('Error verifying TOTP');
      }
      console.error('Error verifying TOTP:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="overlay"></div>
      <div className="login-card p-5">
        <img src="https://theseedfi.com/wp-content/uploads/2024/05/seedfi-green.svg" className="mx-auto" alt="SeedFi Logo" />
        <h6 className="figtree-heading">Welcome to Seed<i>Fi</i> Credit Report</h6>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div id="otp" className="form-group">
              <label>OTP</label>
              <input
                type="text"
                name="otp"
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            {error && <p className="error text-red-500">{error}</p>}
            <br />
            <button type="submit" className="btn btn-success">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TotpLoginComponent;
