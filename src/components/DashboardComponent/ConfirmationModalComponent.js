import React, { useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function ConfirmationModal({ showModal, setShowModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(null);

  const generateReport = async () => {
    setIsLoading(true);
    setError(null);
    setReportData(null); // Clear any previous report data
    try {
      const response = await axios.post(
        `${backendUrl}/generate_report`,
        null,
        {
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type header
          },
          withCredentials: true, // Include credentials (cookies) in the request
        }
      );
      setIsLoading(false);
      setReportData(response.data); // Set the report data to display in the modal
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.error || 'An error occurred while generating the report.');
    }
  };

  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 fixed inset-0"></div>
          
          {/* Modal Container with Reduced Width */}
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 z-10">
            
            {/* Confirm Action Section */}
            <div className="mx-auto w-full">
              <h3 className="text-lg font-semibold text-gray-800">Confirm Action</h3>
              <p className="mt-2 text-sm text-gray-600">Are you sure you want to generate the report?</p>
              <p className="mt-2 text-sm text-gray-600">Report generation takes a while.....</p>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  onClick={() => setShowModal(false)}
                  disabled={isLoading}
                >
                  Close
                </button>
                {!reportData && !isLoading && (
                  <button
                    className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-500"
                    onClick={generateReport}
                    disabled={isLoading}
                  >
                    Confirm
                  </button>
                )}
              </div>
            </div>
              
            {isLoading && (
              <div className="flex justify-center items-center mt-4">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {/* Report Data Section */}
            {reportData && (
              <div className="mt-4 max-h-[60vh] overflow-y-auto">
                <h4 className="text-md font-semibold text-gray-800">Generated Report</h4>
                <div className="overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: reportData.data }} />
                </div>

                {/* Download Buttons */}
                <div className="download-field mt-4 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2">
                  <form method="get" action={`${backendUrl}/download_seedfi_csv`}>
                    <button className="download-button bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 w-full sm:w-auto" type="submit">
                      Download SEEDFI Report
                    </button>
                  </form>
                  <form method="get" action={`${backendUrl}/download_cr_csv`}>
                    <button className="download-button bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 w-full sm:w-auto" type="submit">
                      Download CR Report
                    </button>
                  </form>
                  <form method="get" action={`${backendUrl}/download_crc_csv`}>
                    <button className="download-button bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 w-full sm:w-auto" type="submit">
                      Download CRC Report
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>
      ) : null}
    </>
  );
}

export default ConfirmationModal;
