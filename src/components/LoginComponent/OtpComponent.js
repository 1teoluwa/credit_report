import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const OtpComponent = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/verify-otp`, { otp }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true, // Include credentials (cookies) in the request
      });
      
      if (response.data.success) {
        navigate('/qr'); // Navigate to the success page after OTP verification
      } else {
        setError(response.data.error || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('Invalid Passcode');
      console.error('Error during OTP verification:', error);
    }
  };

  return (
    <div className="min-h-screen p-14 flex items-center justify-center ">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-md z-10 w-full max-w-md">
        <img
          src="https://theseedfi.com/wp-content/uploads/2024/05/seedfi-green.svg"
          alt="SeedFi Logo"
          className="mx-auto mb-6 w-32"
        />
        <h2 className="text-2xl font-semibold text-center mb-6">Verify Passcode</h2>
        <p className="text-center mb-6">Please enter the passcode sent to your email</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Passcode</label>
            <input
              type="text"
              id="otp"
              name="otp"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter Passcode"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 ">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2A8851] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpComponent;
