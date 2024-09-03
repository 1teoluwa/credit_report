import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    setLoading(true); // Show spinner

    try {
      const response = await axios.post(`${backendUrl}/login`,
        { email },
        { withCredentials: true }) // This ensures that cookies are sent and stored;
      
      setMessage(response.data.message);
      setError(null);

      if (response.status === 200) {
        navigate('/verify_otp'); // Navigate to the OTP page
      } else {
        console.log("Login did not succeed, status code:", response.status);
      }
    } catch (error) {
      setMessage(null);
      setError('Invalid Email, Email is case-sensitive');
      console.error('Error during login:', error);
    } finally {
      setLoading(false); // Hide spinner
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
        <h6 className="text-2xl font-semibold text-center mb-6">
          Welcome to Seed<i>Fi</i> Credit Report
        </h6>
        <div className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              {/* <p className='text-muted'>Email is case sensitive</p> */}
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}
            {loading && ( // Display spinner during loading
            <div className="flex justify-center items-center mt-4">
              <div className="w-12 h-12 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
            </div>
          )}

            <button
              type="submit"
              className="w-full mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2A8851] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={loading} // Disable button during loading
            >
              Send Passcode
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
