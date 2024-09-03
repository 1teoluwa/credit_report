import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './QrLoginComponent.css'; // Ensure this CSS file is properly set up

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const QrLoginComponent = () => {
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const fetchQrCode = async () => {
    try {
      console.log("Fetching QR Code...");
      const response = await axios.get(`${backendUrl}/qr_code`, {
        withCredentials: true, // Include credentials (cookies) in the request
      });
      
      const svgUrl = `data:image/svg+xml;base64,${response.data.qr_code}`;
      setQrCode(svgUrl); // Set the generated SVG URL to display
      setError(null); // Clear any previous errors
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Unauthorized access. Please log in again.');
      } else {
        setError('Error fetching QR code');
      }
      console.error('Error fetching QR code:', error);
    }
  };

  const checkSeedlingStatus = async () => {
    try {
      const response = await axios.get(`${backendUrl}/qr`, {
        withCredentials: true, // Include credentials (cookies) in the request
      });
      console.log("QR response:", response);
      if (response.data.is_active) {
        navigate('/totp_login');
      } else if (response.data.redirect === "login") {
        navigate('/login');
      } else if (response.data.redirect === "qr") {
        fetchQrCode(); // Fetch QR code if seedling is not active
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Unauthorized access. Please log in again.');
      } else {
        setError('Error checking seedling status');
      }
      console.error('Error checking seedling status:', error);
    }
  };

  useEffect(() => {
    checkSeedlingStatus(); // Check seedling status on component mount
  }, []);

  return (
    <div className="mx-auto my-auto">
      <h2 id="figtree-heading">Scan the QR code below to login</h2>
      {qrCode ? (
        <>
          <img src={qrCode} alt="QR Code" className="mx-auto" />
          <button 
            className='w-full mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2A8851]'
            onClick={() => navigate('/totp_login')}
          >
            Login
          </button>
        </>
      ) : (
        <p>Loading QR code...</p>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default QrLoginComponent;
