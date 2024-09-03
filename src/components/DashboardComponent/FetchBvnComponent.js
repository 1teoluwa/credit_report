import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function FetchBVNForm() {
    const [userId, setUserId] = useState('');
    const [filename, setFilename] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [abortController, setAbortController] = useState(null);

    const onDrop = (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        setFilename(selectedFile.name);
        setFile(selectedFile);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleChange = (e) => {
        setUserId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user_id', userId);

        const controller = new AbortController();
        setAbortController(controller);

        setLoading(true);

        axios.post(`${backendUrl}/fetch_bvn_by_user_id_for_seedscore`, formData, {
            signal: controller.signal
        })
        .then(response => {
            const formattedResponse = JSON.stringify(response.data, null, 2);
            setResponseMessage(formattedResponse);
            setShowModal(true);  // Show the modal with the response
        })
        .catch(error => {
            if (axios.isCancel(error)) {
                setResponseMessage('Request canceled');
            } else {
                setResponseMessage(`There was an error: ${error.message}`);
            }
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setResponseMessage('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('uploaded_file', file);

        const controller = new AbortController();
        setAbortController(controller);

        setLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/bvn_fetching_process`, formData, {
                responseType: 'blob',
                signal: controller.signal
            });

            const blob = new Blob([response.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${new Date().toISOString().slice(0, 19).replace(/[-:]/g, '')}_bvn_fetching_report.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setResponseMessage('File processed and downloaded successfully.');
        } catch (error) {
            if (axios.isCancel(error)) {
                setResponseMessage('Request canceled');
            } else {
                setResponseMessage(`There was an error: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(responseMessage).then(() => {
            alert('BVN data copied to clipboard!');
        });
    };

    useEffect(() => {
        return () => {
            if (abortController) {
                abortController.abort();
            }
        };
    }, [abortController]);

    return (
        <div className="flex flex-col h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Fetch BVN</h2>
            <div className="card py-12 px-24 mx-md-auto overflow-auto mx-72 shadow-sm">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="userId" className="form-label">Input User ID</label>
                        <div className="flex">
                            <input
                                type="text"
                                className="flex-grow px-4 py-2 text-gray-700 bg-gray-100 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                id="userId"
                                value={userId}
                                onChange={handleChange}
                                placeholder="Input User ID"
                            />
                            <button 
                                className="px-4 py-2 text-white bg-green-700 rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
                <div 
                    {...getRootProps({ className: 'file-drop-area mt-4 p-4 text-center border-2 border-dotted border-green-500 rounded-md' })}
                >
                    <input {...getInputProps()} />
                    <i className="bi bi-file-earmark-arrow-up fs-1 text-muted"></i>
                    <img src={require('../../assets/file.png')} alt="file" className='mx-auto' />
                    <p className="text-muted">Drag and drop a CSV file here or <a href="javascript:void(0);" className="text-success">choose a file</a></p>
                </div>
                {filename && (
                    <div className="mt-4">
                        <p className="text-gray-800">Selected file: <strong>{filename}</strong></p>
                    </div>
                )}
                <button className="btn btn-success mt-4 mx-auto" onClick={handleFileUpload}>Fetch BVN</button>
                {loading && (
                    <div className="flex justify-center items-center mt-4">
                        <div className="w-12 h-12 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">BVN Data</h3>
                        <pre className="bg-gray-100 p-4 rounded-md overflow-auto">{responseMessage}</pre>
                        <div className="flex justify-end mt-4">
                            <button 
                                className="px-4 py-2 mr-2 text-white bg-green-700 rounded-md hover:bg-green-600 focus:outline-none"
                                onClick={copyToClipboard}
                            >
                                Copy to Clipboard
                            </button>
                            <button 
                                className="px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FetchBVNForm;
