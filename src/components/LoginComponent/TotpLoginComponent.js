import React from 'react';
import './LoginComponent.css';

const TotpLoginComponent = () => {
  return (
    <div className="login-container ">
      <div className="overlay"></div>
      <div className="login-card p-5">
        <img src="https://theseedfi.com/wp-content/uploads/2024/05/seedfi-green.svg" className="ml-5" alt="SeedFi Logo" />
        <h6 className="figtree-heading">Welcome to Seed<i>Fi</i> Credit Report</h6>
        <div className="form-wrapper">
          <form>
            <div id="email-address" className="form-group">
              <label>OTP</label>
              <input type="email" name="email" className="form-control" placeholder="Enter OTP" required />
            </div>
            <br></br>
            <br></br>
            <button type="submit" className="btn btn-success">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TotpLoginComponent;