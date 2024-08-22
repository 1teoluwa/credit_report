import React from 'react';
import '../LoginComponent.css';

const OtpComponent = () => {
  return (
    <div className="login-container">
      <div className="overlay"></div>
      <div className="login-card">
        <img src="https://theseedfi.com/wp-content/uploads/2024/05/seedfi-green.svg" alt="SeedFi Logo" />
        <h2 id="figtree-heading">Verify Passcode</h2>
            <p>Please enter the passcode sent to your email</p>
        <div className="form-wrapper">
          <form>
            <div id="email-address" className="form-group">
              
              <input type="email" name="email" className="form-control" placeholder="Enter Passcode" required />
            </div>
            <br></br>
            <br></br>
            <button type="submit" className="btn btn-success">Verify</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpComponent;