import React from 'react';
import './DashboardComponent.css';


const LoginComponent = () => {
  return (
    <div className="login-container">
      <div className="overlay"></div>
      <div className="login-card align-items-center justify-content-center">
        <img src="https://theseedfi.com/wp-content/uploads/2024/05/seedfi-green.svg" alt="SeedFi Logo" />
        <h6 className="figtree-heading">Welcome to Seed<i>Fi</i> Credit Report</h6>
        <div className="form-wrapper">
          <form>
            <div id="email-address" className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" className="form-control" placeholder="Enter your mail" required />
            </div>
            <br></br>
            <br></br>
            <button type="submit" className="btn btn-success">Send Passcode</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;