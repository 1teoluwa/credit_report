import React, { useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function SeedscoreCheckForm() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    bvn: '',
    dob: '',
    phone_no: '',
    gender: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false); // State for spinner
  const [showModal, setShowModal] = useState(false); // State for modal
  const [isError, setIsError] = useState(false); // State to track if the response is an error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
      
  const formatDate = () => {
    const dateInput = document.getElementById('dob').value;
    const date = new Date(dateInput);

    if (!isNaN(date.getTime())) { // Check if the date is valid
      const formatted = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
      document.getElementById('formattedDate').innerText = `Formatted Date: ${formatted}`;
    } else {
      document.getElementById('formattedDate').innerText = ''; // Clear if invalid date
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner

    axios.post(`${backendUrl}/process_file`, formData)
      .then(response => {
        setResponseMessage(JSON.stringify(response.data, null, 2));
        setIsError(false);
      })
      .catch(error => {
        setResponseMessage(`There was an error: ${error.message}`);
        setIsError(true);
      })
      .finally(() => {
        setLoading(false); // Stop loading spinner
        setShowModal(true); // Show modal on response
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(responseMessage);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Seedscore Check Form</h2>
      <div className="flex-grow bg-white rounded-lg shadow-md p-6 overflow-auto mx-72 max-w-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Form fields remain unchanged */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstname"
              placeholder="Enter first name"
              value={formData.firstname}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastname"
              placeholder="Enter last name"
              value={formData.lastname}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="bvn" className="block text-sm font-medium text-gray-700">BVN</label>
            <input
              type="text"
              id="bvn"
              name="bvn"
              placeholder="Enter BVN"
              value={formData.bvn}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={(e) => {
                handleChange(e);
                formatDate();
              }}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
            <p id="formattedDate" className="mt-2 text-sm text-gray-500"></p>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone_no"
              placeholder="Enter phone number"
              value={formData.phone_no}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-success d-grid mx-auto text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit
          </button>
        </form>
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="w-12 h-12 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 w-full max-w-3xl">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              {isError ? 'Error' : 'Success'}
            </h3>
            <pre className="whitespace-pre-wrap break-words overflow-auto bg-gray-100 p-4 rounded-md max-h-80">
              {responseMessage}
            </pre>
            {!isError && (
              <button
                onClick={handleCopyToClipboard}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Copy to Clipboard
              </button>
            )}
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}

export default SeedscoreCheckForm;
